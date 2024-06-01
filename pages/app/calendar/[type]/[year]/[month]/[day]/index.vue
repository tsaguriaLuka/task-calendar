<script setup lang="ts">
import { format, parse } from "date-fns"
import { useEventsStore } from "~/stores/events"
import { storeToRefs } from "pinia"
import { setTargetEl } from "~/composables/mouse-move"
import { useCalendar } from "~/composables/calendar"

const pageTitle = useState('page-title')
const targetContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  pageTitle.value = 'My App'
  if (targetContainer.value) setTargetEl(targetContainer.value)
})

await useEventsStore().fetchEvents()

const {
  currentViewType,
  monthDays,
  weekDays,
  dayHours,
  curMonthName,
  month,
  day,
  year,
  dateLabel,
} = useCalendar()

const eventModal = ref(false)
const { eventFormData } = storeToRefs(useEventsStore())

const date = ref(format(new Date(), 'yyyy-MM-dd'))
const startMinutesDate = ref<string>()
const endMinutesDate = ref<string>()

const createEventModal = () => {
  const now = new Date()
  startMinutesDate.value = format(now, 'HH:mm')
  endMinutesDate.value = format(new Date(now.getTime() + 15 * 60 * 1000), 'HH:mm')
  eventModal.value = true
}

const submitEventCreate = async () => {
  if (!date.value || !startMinutesDate.value || !endMinutesDate.value) return

  const parseDateTime = (date: string, time: string) =>
      parse(`${ date }T${ time }`, 'yyyy-MM-dd\'T\'HH:mm', new Date()).getTime()

  Object.assign(eventFormData.value, {
    startTimestamp: parseDateTime(date.value, startMinutesDate.value),
    endTimestamp: parseDateTime(date.value, endMinutesDate.value)
  })


  await useEventsStore().createEvent()

  eventModal.value = false
}
</script>


<template>
  <div class="calendar">
    <VModal
      :open="eventModal"
      @close="eventModal = false"
      title="Create Event"
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
      :current-view-type="currentViewType"
      :date-label="dateLabel"
      :month
      :day
      :year
      @create-event-modal="createEventModal()"
    />

    <VCard
      :style="{
        '--card-height': currentViewType === 'month' ? '78vh' : '72vh',
        '--events-height': currentViewType === 'month' ? 'fit-content' : '1440px'
      }"
    >
      <div class="calendar-wrapper">
        <div
          class="calendar-days"
          v-if="currentViewType === 'week'"
        >
          <div
            v-for="day in weekDays"
          >
            {{ format(day, 'EE dd') }}
          </div>
        </div>

        <div
          class="calendar-container"
          ref="targetContainer"
        >
          <VCalendarEvents
            :dayHours="dayHours"
            :current-view-type="currentViewType"
          >
            <VCalendarDayView
              v-if="currentViewType === 'day'"
            />

            <VCalendarWeekView
              v-if="currentViewType === 'week'"
              :week-days="weekDays"
            />

            <VCalendarMonthView
              v-if="currentViewType === 'month'"
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

  &-wrapper {
    width: 100%;
    min-width: 600px;
  }

  &-days {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 99;
    width: calc(100% - 60px);
    min-width: 540px;
    margin-left: auto;

    > * {
      width: 100%;
      text-align: center;
    }
  }

  &-container {
    min-width: 100%;
  }
}
</style>
