<script setup>
defineProps({
  grandTotal: { type: Number, default: null },
  totalLabel: { type: String, default: 'Grand Total' },
  totalSuffix: { type: String, default: '' },
  showTotal: { type: Boolean, default: true }
})

const emit = defineEmits(['print'])

const handlePrint = () => {
  emit('print')
}
</script>

<template>
  <div class="no-print sticky top-0 z-40 bg-white border-b border-ink-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div v-if="showTotal && grandTotal !== null" class="flex items-center gap-6">
        <div>
          <span class="text-xs font-semibold text-ink-400 uppercase tracking-wide">{{ totalLabel }}</span>
          <div class="font-mono text-xl font-bold text-teal-700">
            {{ grandTotal }}{{ totalSuffix }}
          </div>
        </div>
      </div>

      <button
        @click="handlePrint"
        class="btn-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Print / Save as PDF
      </button>
    </div>
  </div>
</template>
