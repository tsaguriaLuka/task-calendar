<script setup lang="ts">
import { format, parse } from "date-fns";
import { useEventsStore } from "~/stores/events";
import { storeToRefs } from "pinia";

const pageTitle = useState('page-title')

onMounted(() => {
  pageTitle.value = 'My App'
})

await useEventsStore().fetchedEvents()

const {
  curType,
  monthDays,
  weekDays,
  dayHours,
  curMonthName,
  month,
  day,
  year,
  dateLabel,
} = useCalendar();

const createEventForm = ref(false)
const { eventFormData } = storeToRefs(useEventsStore())

const date = ref<string>(format(new Date(), 'yyyy-MM-dd'))

const startMinutesDate = ref<string>()
const endMinutesDate = ref<string>()

const createEventModal = () => {
  const startTime = format(Date.now(), 'HH:mm');
  const endTime = format(Date.now() + 15 * 60 * 1000, 'HH:mm');

  startMinutesDate.value = startTime;
  endMinutesDate.value = endTime;

  createEventForm.value = true;
}

const submitEventCreate = async () => {
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

  await useEventsStore().createEvent()
}
</script>

<template>
  <div class="calendar">
    <VModal
      :open="createEventForm"
      @close="createEventForm = false"
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
          @click="submitEventCreate()"
        >
          Create
        </VButton>
      </template>
    </VModal>

    <VCalendarHeader
      :cur-month-name="curMonthName"
      :cur-type="curType"
      :date-label="dateLabel"
      :month
      :day
      :year
      @create-event-modal="createEventModal()"
    />

    <VCard
      :style="{
        '--card-height': curType === 'month' ? '78vh' : '72vh',
        '--events-height': curType === 'month' ? 'fit-content' : '1440px'
      }"
    >
      <div class="calendar-wrapper">
        <div
          class="calendar-days"
          v-if="curType === 'week'"
        >
          <div
            v-for="day in weekDays"
          >
            {{ format(day, 'EE dd') }}
          </div>
        </div>

        <div
          class="calendar-container"
        >
          <VCalendarEvents
            :dayHours="dayHours"
            :cur-type="curType"
          >
            <VCalendarDayView
              v-if="curType === 'day'"
            />

            <VCalendarWeekView
              v-if="curType === 'week'"
              :week-days="weekDays"
            />

            <VCalendarMonthView
              v-if="curType === 'month'"
              :month-days="monthDays"
            />
          </VCalendarEvents>
        </div>
      </div>
    </VCard>
  </div>
</template>

<style scoped lang="scss">
.calendar {
  .r-card {
    max-height: var(--card-height);
    overflow: scroll;
  }

  &-days {
    display: flex;
    justify-content: space-between;
    margin: 0 80px;
    position: sticky;
    top: 0;
    z-index: 99;
  }
}
</style>
