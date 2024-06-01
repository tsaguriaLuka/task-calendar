<script setup lang="ts">
import { useEventsStore } from "~/stores/events";
import { storeToRefs } from "pinia";
import {format, parse} from "date-fns";


const props = withDefaults(defineProps<{
  event: {
    title: string
    description: string
    eventStart: number
    eventEnd: number
    id: string
  }
  height?: number
  top?: number | null
}>(), {
  height: 20,
  top: null
})

const eventModal = ref(false)

const {
  eventFormData,
  eventResponse
} = storeToRefs(useEventsStore())

const date = ref<string>(format(new Date(), 'yyyy-MM-dd'))

const startMinutesDate = ref<string>()
const endMinutesDate = ref<string>()

const openEventInfo = async () => {
  await useEventsStore().fetchEventById(props.event.id)

  if (!eventResponse.value) return

  eventFormData.value.title = eventResponse.value?.title || ''
  eventFormData.value.description = eventResponse.value?.description || ''
  date.value = format(new Date(eventResponse.value?.eventStart), 'yyyy-MM-dd')

  const startTime = format(new Date(eventResponse.value?.eventStart), 'HH:mm');
  const endTime = format(new Date(eventResponse.value?.eventEnd), 'HH:mm');

  startMinutesDate.value = startTime;
  endMinutesDate.value = endTime;

  eventModal.value = true
}

const submitEventUpdate = async () => {
  if (
    !date.value ||
    !startMinutesDate.value ||
    !endMinutesDate.value
  ) return;

  const getParsedDate = (date: string, mins: string) => {
    return parse(`${ date }T${ mins }`, 'yyyy-MM-dd\'T\'HH:mm', new Date());
  }

  const eventStartDate = getParsedDate(date.value, startMinutesDate.value)
  const eventEndDate = getParsedDate(date.value, endMinutesDate.value)

  const eventStartMillis = eventStartDate.getTime();
  const eventEndMillis = eventEndDate.getTime();

  eventFormData.value.eventStart = eventStartMillis
  eventFormData.value.eventEnd = eventEndMillis

  await useEventsStore().updateEvent({
    id: props.event.id,
    ...eventFormData.value
  })
}
</script>

<template>
   <div
      class="calendar-event-container"
      :style="{
        '--position': top ? 'absolute' : 'relative',
        '--top': `${ top || 0 }px`,
        '--height': `${ height }px`
      }"
      @click="openEventInfo"
   >
     <div class="calendar-event">
       {{ event?.title }}
     </div>

     <VModal
         :open="eventModal"
         @close="eventModal = false"
         title="Event info"
     >
       <template #content>
         <VField>
           <VInput
               type="text"
               placeholder="title"
               autocomplete="name"
               v-model="eventFormData.title"
           />
         </VField>

         <VField>
           <VInput
               type="text"
               placeholder="description"
               autocomplete="name"
               v-model="eventFormData.description"
           />
         </VField>

         <VField>
           <label for="">Date</label>

           <VInput
               type="date"
               placeholder="description"
               v-model="date"
           />
         </VField>

         <VField>
           <label>Time start</label>

           <VInput
               type="time"
               placeholder="start"
               v-model="startMinutesDate"
           />
         </VField>

         <VField>
           <label>Time end</label>

           <VInput
               type="time"
               placeholder="end"
               v-model="endMinutesDate"
           />
         </VField>

         <VButton
             fullwidth
             color="primary"
             @click="submitEventUpdate()"
         >
           Update
         </VButton>
       </template>
     </VModal>
   </div>
</template>

<style scoped lang="scss">
.calendar-event {
  position: var(--position);
  width: 100%;
  left: 0;
  background-color: var(--primary);
  height: var(--height);
  padding: 4px 8px;
  border-radius: 8px;
  top: var(--top);
  min-height: 28px;
  white-space: nowrap;
  font-size: 0.8rem;
  cursor: pointer;
}
</style>
