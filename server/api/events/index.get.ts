export default defineEventHandler(async (event) => {
  return $fetch(`https://6659e798de346625136e6094.mockapi.io/events`);
});
