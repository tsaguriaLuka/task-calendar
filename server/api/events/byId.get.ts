import type { IEvent } from "~/types/event.type";

export default defineEventHandler(async (event) => {
  return $fetch<IEvent>(`https://6659e798de346625136e6094.mockapi.io/events/${ getQuery(event).id }`);
});
