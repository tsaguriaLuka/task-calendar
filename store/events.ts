import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', () => {

  const events = ref([
    {
      title: "Подготовить презентацию",
      eventStart: new Date().toISOString(),
      eventEnd: new Date(Date.now() + (15 + Math.random() * 45) * 60000).toISOString(),
      description: "Подготовить презентацию для совещания команды."
    },
    {
      title: "Встреча с партнером",
      eventStart: new Date(Date.now() +24 * 60 * 60 * 1000).toISOString(),
      eventEnd: new Date(Date.now() + 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
      description: "Планирование сотрудничества с новым партнером."
    },
    {
      title: "Тренировка",
      eventStart: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      eventEnd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
      description: "Посещение тренировки в спортзале."
    },
    {
      title: "Празднование дня рождения",
      eventStart: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      eventEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
      description: "Празднование дня рождения друга в ресторане."
    },
    {
      title: "Прогулка в парке",
      eventStart: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      eventEnd: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
      description: "Прогулка по парку с семьей."
    },
    {
      title: "Посещение выставки",
      eventStart: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      eventEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
      description: "Посещение искусственной выставки в музее."
    },
    {
      title: "Концерт",
      eventStart: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
      eventEnd: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
      description: "Посещение концерта любимой группы."
    }
  ]);

  return {
    events
  };
});
