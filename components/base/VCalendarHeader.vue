<script setup lang="ts">
import {
  format,
  addDays,
  addWeeks,
  addMonths
} from 'date-fns';

export interface VDateNavigationProps {
  currentViewType: 'day' | 'week' | 'month'
  dateLabel: string | null,
  curMonthName: string
  year: number
  month: number
  day: number
}

const props = withDefaults(defineProps<VDateNavigationProps>(), {
  currentViewType: 'day',
  dateLabel: null,
  curMonthName: undefined,
  year: 2024,
  month: 1,
  day: 23,
});

const currentDate = computed(() => new Date(props.year, props.month - 1, props.day))

const changeDate = async (type: 'day' | 'week' | 'month', amount: number) => {
  const targetDate = ref<Date | null>(null)

  if (type === 'day') targetDate.value = addDays(currentDate.value, amount);
  if (type === 'week') targetDate.value = addWeeks(currentDate.value, amount);
  if (type === 'month') targetDate.value = addMonths(currentDate.value, amount);

  if (!targetDate.value) return

  await useRouter().push(getUrl(props.currentViewType, targetDate.value))
};

const currentViewTypeLocal = ref<string>(props.currentViewType)

watch(currentViewTypeLocal, async (value) => {
  await useRouter().push(getUrl(value, currentDate.value))
})

const getUrl = (value: string, date: Date) => {
  return `/app/calendar/${ value }/${ format(date, 'yyyy/MM/dd') }`
}
</script>

<template>
  <div class="date-navigator">
    <VField>
      <VLabel>
        {{ dateLabel }}
      </VLabel>
    </VField>

    <VButton
      color="primary"
      @click="$emit('createEventModal')"
    >
      Create Event
    </VButton>

    <div class="date-navigator__controls">
      <VIconBox
        size="small"
        @click="changeDate(currentViewType, -1)"
      >
         <VIcon
           icon="lucide:chevron-left"
         />
      </VIconBox>

      <VField>
        <VSelect v-model="currentViewTypeLocal">
          <template v-slot>
            <option value="day">Day</option>

            <option value="week">Week</option>

            <option value="month">Month</option>
          </template>
        </VSelect>
      </VField>

      <VIconBox
        size="small"
        @click="changeDate(currentViewType, 1)"
      >
       <VIcon
         icon="lucide:chevron-right"
       />
      </VIconBox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-navigator {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  align-items: center;
  gap: 12px;
  margin-bottom: 0.75rem;

  > :last-child {
    justify-content: flex-end;
  }

  .field,
  label {
    margin-bottom: 0;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);

    > :last-child {
      justify-content: flex-end;
      grid-column: 1 / 3;
    }
  }
}
</style>
