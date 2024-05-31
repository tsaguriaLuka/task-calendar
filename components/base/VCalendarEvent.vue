<script setup lang="ts">
withDefaults(defineProps<{
  event: {
    title: string,
    description: string,
    eventStart: number,
    eventEnd: number
  } | null,
  height: number,
  top: number | null
}>(), {
  event: null,
  height: 20,
  top: null
})
</script>

<template>
   <div
      class="calendar-event-container"
      :style="{
        '--position': top ? 'absolute' : 'relative',
        '--top': `${ top || 0 }px`,
        '--height': `${ height }px`
      }"
   >
     <div class="calendar-event">
       {{ event?.title }}
     </div>
   </div>
</template>

<style scoped lang="scss">
.calendar-event {
  position: var(--position);
  width: 100%;
  left: 0;
  background-color: var(--primary);
  height: var(--height);
  padding: 4px 8px;
  border-radius: 8px;
  top: var(--top);
  min-height: 28px;
  white-space: nowrap;
  font-size: 0.8rem;
  cursor: pointer;
}
</style>
