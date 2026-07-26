<script setup>
import { usePrint } from '@/composables/usePrint'

const { printDocument } = usePrint()

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>

<template>
  <div class="p-4 md:p-8">
    <div class="flex justify-between mb-6 no-print">
      <div>
        <h1 class="text-2xl font-bold text-ink">{{ title }}</h1>
        <p
          v-if="subtitle"
          class="text-sm text-ink-400 mt-1"
        >{{ subtitle }}</p>

      </div>
      <button
        @click="printDocument"
        class="btn-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect
            x="6"
            y="14"
            width="12"
            height="8"
          ></rect>
        </svg>
        Print / Save as PDF
      </button>
    </div>

    <div class="flex flex-col xl:flex-row gap-8 items-start max-w-7xl mx-auto justify-between">
      <div class="no-print space-y-5 shrink-0">
        <slot name="editor" />
      </div>

      <div class="min-w-0 w-full max-w-3xl mx-auto">
        <slot name="preview" />
      </div>
    </div>
  </div>
</template>
