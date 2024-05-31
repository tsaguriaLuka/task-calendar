import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  getHours
} from 'date-fns';

export function useCalendar() {
  const route = useRoute()

  const curType = computed(() => route.params.type as 'day' | 'month' | 'week')
  const year = computed(() => Number(route.params.year))
  const month = computed(() => Number(route.params.month))
  const day = computed(() => Number(route.params.day))

  const monthDays = computed(() => {
    const start = startOfMonth(new Date(year.value, month.value - 1))
    const end = endOfMonth(new Date(year.value, month.value - 1))

    return eachDayOfInterval({ start, end })
  })

  const weekDays = computed(() => {
    const start = startOfWeek(new Date(year.value, month.value - 1, day.value))
    const end = endOfWeek(new Date(year.value, month.value - 1, day.value))

    return eachDayOfInterval({ start, end })
  })

  const dayHours = computed(() => {
    // const start = startOfDay(new Date(year.value, month.value - 1, day.value))
    // const end = endOfDay(new Date(year.value, month.value - 1, day.value))
    //
    // return eachHourOfInterval({ start, end })
    const start = startOfDay(new Date(year.value, month.value - 1, day.value));
    const end = endOfDay(new Date(year.value, month.value - 1, day.value));

    return eachHourOfInterval({ start, end} ).map(hour => format(hour, 'h a'));
  });

  const curMonthName = computed(() => {
    return format(new Date(year.value, month.value - 1), 'MMMM');
  });

  const dateLabel = computed(() => {
    if (curType.value === 'day') {
      return `${ curMonthName.value } ${ day.value }, ${ year.value }`;
    }

    const firstDayOfWeek = weekDays.value[0];
    const lastDayOfWeek = weekDays.value[weekDays.value.length - 1];

    if (
      curType.value === 'week' &&
      (firstDayOfWeek.getMonth() !== lastDayOfWeek.getMonth())
    ) {
      return `${ format(firstDayOfWeek, 'MMMM') } - ${ format(lastDayOfWeek, 'MMMM') }, ${ year.value }`;
    }

    return `${ curMonthName.value }, ${ year.value }`;
  });

  return {
    curType,
    monthDays,
    weekDays,
    dayHours,
    year,
    day,
    month,
    curMonthName,
    dateLabel
  }
}

