<script setup lang="ts">
import { useEventsStore } from "~/stores/events"
import { storeToRefs } from "pinia"
import { format, parse } from "date-fns"

const props = withDefaults(defineProps<{
  event: {
    title: string
    description: string
    startTimestamp: number
    endTimestamp: number
    id: string
  }
  height?: number
  top?: number | null
}>(), {
  height: 20,
  top: null
})

const isEventModalVisible = ref(false)
const { eventFormData, eventResponse } = storeToRefs(useEventsStore())

const selectedDate = ref(format(new Date(), 'yyyy-MM-dd'))
const startTime = ref<string>()
const endTime = ref<string>()

const openEventInfo = async () => {
  const eventsStore = useEventsStore()
  await eventsStore.fetchEventById(props.event.id)

  if (!eventResponse.value) return

  const { title, description, startTimestamp, endTimestamp } = eventResponse.value
  Object.assign(eventFormData.value, { title, description })

  selectedDate.value = format(new Date(startTimestamp), 'yyyy-MM-dd')
  startTime.value = format(new Date(startTimestamp), 'HH:mm')
  endTime.value = format(new Date(endTimestamp), 'HH:mm')

  isEventModalVisible.value = true
}

const updateEventInfo = async () => {
  if (!selectedDate.value || !startTime.value || !endTime.value) return

  const parseDateTime = (date: string, time: string) =>
      parse(`${date}T${time}`, 'yyyy-MM-dd\'T\'HH:mm', new Date()).getTime()

  Object.assign(eventFormData.value, {
    startTimestamp: parseDateTime(selectedDate.value, startTime.value),
    endTimestamp: parseDateTime(selectedDate.value, endTime.value)
  })

  await useEventsStore().updateEvent({
    id: props.event.id,
    ...eventFormData.value
  })

  isEventModalVisible.value = false
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
         :open="isEventModalVisible"
         @close="isEventModalVisible = false"
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
           <label>Date</label>

           <VInput
               type="date"
               placeholder="description"
               v-model="selectedDate"
           />
         </VField>

         <VField>
           <label>Time start</label>

           <VInput
               type="time"
               placeholder="start"
               v-model="startTime"
           />
         </VField>

         <VField>
           <label>Time end</label>

           <VInput
               type="time"
               placeholder="end"
               v-model="endTime"
           />
         </VField>

         <VButton
             fullwidth
             color="primary"
             @click="updateEventInfo()"
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
