<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/invoice', label: 'Invoice', hint: 'Bill a client' },
  { to: '/proposal', label: 'Proposal', hint: 'Scope new work' },
  { to: '/updates', label: 'Update Notes', hint: 'Share progress' }
]
</script>

<template>
  <aside class="no-print w-full lg:w-56 shrink-0 lg:sticky lg:top-0 lg:h-screen border-b lg:border-b-0 lg:border-r border-ink-100 bg-white">
    <div class="p-5 flex items-center gap-2.5">
      <span class="brand-fold"></span>
      <div class="leading-tight">
        <p class="font-display font-bold text-sm text-ink">Biz Docs</p>
        <p class="text-[11px] text-ink-400 -mt-0.5">Studio</p>
      </div>
    </div>

    <nav class="px-3 pb-5 flex lg:flex-col gap-1">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="group flex-1 lg:flex-none flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors"
        :class="
          route.path === link.to
            ? 'bg-teal-50 text-teal-700'
            : 'text-ink-600 hover:bg-ink-50'
        "
      >
        <span>{{ link.label }}</span>
        <span
          class="hidden lg:inline text-[11px] font-normal"
          :class="route.path === link.to ? 'text-teal-600' : 'text-ink-200 group-hover:text-ink-400'"
        >
          {{ link.hint }}
        </span>
      </RouterLink>
    </nav>
  </aside>
</template>
