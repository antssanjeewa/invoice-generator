<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>

<template>
  <div class="p-4 md:p-8">
    <div class="no-print mb-6">
      <h1 class="text-2xl font-bold text-ink">{{ title }}</h1>
      <p
        v-if="subtitle"
        class="text-sm text-ink-400 mt-1"
      >{{ subtitle }}</p>
    </div>

    <div class="flex flex-col xl:flex-row gap-8 items-start">
      <div class="no-print w-full xl:w-[440px] shrink-0 space-y-5">
        <slot name="editor" />
      </div>

      <div class="print-area w-full min-w-0">
        <slot name="preview" />
      </div>
    </div>
  </div>
</template>
