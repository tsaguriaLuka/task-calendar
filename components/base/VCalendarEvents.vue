<script setup lang="ts">
withDefaults(defineProps<{
  dayHours: String[],
  currentViewType: string
}>(), {
  dayHours: () => [],
  currentViewType: 'day'
});
</script>

<template>
   <div class="calendar-events">
     <div class="calendar-events-hours">
       <div
         class="calendar-events-hour"
         v-if="currentViewType !== 'month'"
         v-for="(hour, index) in dayHours"
         :key="index"
       >
         {{ hour }}
       </div>
     </div>

     <slot />
   </div>
</template>

<style scoped lang="scss">
.calendar-events {
  display: flex;
  gap: 12px;
  position: relative;
  width: 100%;
  height: var(--events-height);
  overflow: auto;

  &-hours {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 12px;
  }

  &-hour {
    width: 48px;
    text-align: right;
    white-space: nowrap;
    position: relative;
  }
}
</style>
