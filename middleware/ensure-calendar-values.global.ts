import { format } from 'date-fns';


export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.includes('/calendar')) {
    return;
  }

  const {
    type,
    day,
    year,
    month
  } = to.params;

  if (
    !type||
    !month ||
    !day ||
    !year
  ) {
    const currentDate = format(Date.now(), 'yyyy/MM/dd');

    return navigateTo(`/app/calendar/day/${ currentDate }`);
  }
})
