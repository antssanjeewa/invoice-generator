<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String }
})

const isExpanded = ref(true)



</script>
<template>
  <div class="panel transition-all duration-300">
    <!-- Panel Header (Click to toggle) -->
    <div
      class="flex cursor-pointer items-center justify-between"
      @click="isExpanded = !isExpanded"
    >
      <h2 class="text-sm font-semibold text-ink">{{ title }}</h2>

      <div class="flex gap-2">

        <slot name="action" />
        <!-- Expand / Collapse Toggle Button -->
        <button
          type="button"
          class="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none transition-colors"
          :aria-expanded="isExpanded"
          aria-label="Toggle Panel"
        >
          <svg
            class="h-4 w-4 transform transition-transform duration-300 ease-in-out"
            :class="{ 'rotate-180': !isExpanded }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Animated Smooth Expandable Content -->
    <div
      class="grid transition-all duration-300 ease-in-out"
      :class="isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'"
    >
      <div class="overflow-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>