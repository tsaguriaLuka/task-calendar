<script setup lang="ts">
import { format}  from "date-fns";

import type { SideblockItem } from '~/components/layouts/sideblock/sideblock.types'


const links = ref<SideblockItem[]>([
  {
    type: 'link',
    label: 'Dashboard',
    icon: 'lucide:grid',
    to: '/app',
  },
  {
    type: 'link',
    label: 'Calendar',
    icon: 'lucide:calendar-days',
    to: `/app/calendar/day/${ format(Date.now(), 'yyyy/MM/dd') }`
  }
])
</script>

<template>
  <SideblockLayout
    :links
    open-on-mounted
    size="large"
  >
    <slot />

    <template #logo>
      <h3 class="is-hidden-mobile ml-2">
        My app
      </h3>
    </template>

    <template #toolbar>
      <div class="toolbar-link">
        <VDarkmodeToggle />
      </div>
    </template>
  </SideblockLayout>
</template>
