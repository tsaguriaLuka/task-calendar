<script setup lang="ts">
const props = withDefaults(defineProps<{ events: {title: string, minutesStart: string, duration: string}[] }>(), {
  events: () => []
});
</script>

<template>
  <div
    class="calendar__event"
    v-for="(event, index) in events"
    :key="index"
    :style="{ '--top': `${ event.minutesStart }px`, '--height': `${ event.duration }px` }"
  >
    {{ event.title }}
  </div>
</template>

<style scoped lang="scss">
.calendar__event {
    position: absolute;
    width: calc(100% - 80px);
    background-color: var(--primary);
    height: var(--height);
    left: 70px;
    padding: 4px 8px;
    border-radius: 8px;
    top: var(--top);
    min-height: 28px;
    font-size: 0.8rem;
    cursor: pointer;
}
</style>
