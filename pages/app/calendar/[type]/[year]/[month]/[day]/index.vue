<script setup lang="ts">
import {setTargetEl} from "~/composables/mouse-move";

const pageTitle = useState('page-title')

const target = ref<HTMLElement | null>(null)

onMounted(() => {
  pageTitle.value = 'My App'
  if (target.value) setTargetEl(target.value)
})


const {
  curType,
  monthDays,
  weekDays,
  dayHours,
  curMonthName,
  month,
  day,
  dateLabel
} = useCalendar();
</script>

<template>
  <div class="calendar">
    <VDateNavigation
      :cur-month-name="curMonthName"
      :cur-type="curType"
      :date-label="dateLabel"
      :year
      :month
      :day
    />

    <VCard>
      <div class="calendar-container" ref="target">
        <VCalendarEvents
          :dayHours="dayHours"
          :cur-type="curType"
        >
          <VEventsDayView
            v-if="curType === 'day'"
          />

          <VEventsWeekView
            v-if="curType === 'week'"
            :week-days="weekDays"
          />

          <VEventsMonthView
            v-if="curType === 'month'"
            :month-days="monthDays"
          />
        </VCalendarEvents>
      </div>
    </VCard>
  </div>
</template>

<style scoped lang="scss">
.calendar {
  .r-card {
    max-height: 72vh;
    overflow: scroll;
  }

  &-container {
    display: flex;
    gap: 12px;
    position: relative;
    width: 100%;
    height: 1440px;
    overflow: auto;
  }
}
</style>
