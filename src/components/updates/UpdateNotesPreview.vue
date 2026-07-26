<script setup>
defineProps({
  docTitle: { type: String, required: true },
  docSubtitle: { type: String, required: true },
  noteDate: { type: String, required: true },
  author: { type: String, required: true },
  forClient: { type: String, required: true },
  sections: { type: Array, required: true }
})
</script>

<template>
  <div class="paper max-w-2xl mx-auto p-12">
    <h1 class="text-3xl font-display font-extrabold text-ink uppercase tracking-tight">
      {{ docTitle }}
    </h1>
    <p v-if="docSubtitle" class="text-ink-600 mt-1">{{ docSubtitle }}</p>

    <div class="flex items-center gap-4 mt-4 text-xs text-ink-400">
      <span class="font-mono">{{ noteDate }}</span>
      <span>{{ author }}</span>
      <span v-if="forClient">for {{ forClient }}</span>
    </div>

    <div class="h-[3px] bg-gradient-to-r from-teal-600 to-amber-600 rounded-full mt-4 mb-8"></div>

    <div class="space-y-6">
      <div v-for="section in sections" :key="section.id">
        <p class="font-semibold text-ink flex items-start gap-2">
          <span class="text-teal-600">&bull;</span>
          <span>{{ section.heading || 'Untitled section' }}</span>
        </p>

        <ul class="pl-6 mt-1.5 space-y-1.5">
          <li v-for="point in section.points" :key="point.id" class="text-sm text-ink-700">
            <span class="text-ink-300 mr-1.5">&#9702;</span>{{ point.text }}
            <ul v-if="point.subPoints.length" class="pl-5 mt-1 space-y-1">
              <li v-for="sub in point.subPoints" :key="sub.id" class="text-xs text-ink-500">
                <span class="text-ink-200 mr-1.5">&ndash;</span>{{ sub.text }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
