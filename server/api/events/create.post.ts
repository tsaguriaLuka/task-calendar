export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return $fetch(`https://6659e798de346625136e6094.mockapi.io/events`, {
    method: "POST",
    body
  });
});
