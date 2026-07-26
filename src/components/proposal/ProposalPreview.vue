<script setup>
defineProps({
  projectTitle: { type: String, required: true },
  projectSubtitle: { type: String, required: true },
  proposalDate: { type: String, required: true },
  preparedFor: { type: Object, required: true },
  preparedBy: { type: String, required: true },
  stages: { type: Array, required: true },
  stageHours: { type: Function, required: true },
  totalHours: { type: Number, required: true }
})
</script>

<template>
  <div class="paper max-w-3xl mx-auto">
    <!-- Cover -->
    <div class="p-12 pb-16 border-b border-ink-100">
      <span class="brand-fold w-9 h-9 mb-5"></span>
      <h1 class="text-4xl font-display font-extrabold text-teal-700 leading-tight uppercase">
        {{ projectTitle }}
      </h1>
      <p v-if="projectSubtitle" class="text-lg font-semibold text-ink-600 uppercase tracking-wide mt-3">
        {{ projectSubtitle }}
      </p>
      <p class="text-sm text-ink-400 mt-2">{{ proposalDate }}</p>

      <div class="grid grid-cols-2 gap-6 mt-10">
        <div>
          <p class="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">Prepared for</p>
          <p class="text-ink-800">{{ preparedFor.name }}</p>
        </div>
        <div>
          <p class="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">Prepared by</p>
          <p class="text-ink-800">{{ preparedBy }}</p>
        </div>
      </div>
    </div>

    <!-- Milestones -->
    <div class="p-12 pt-10">
      <h2 class="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-6">Milestones</h2>

      <div v-for="(stage, sIndex) in stages" :key="stage.id" :class="sIndex > 0 ? 'mt-10' : ''">
        <h3 class="text-lg font-display font-bold text-teal-700">{{ stage.title }}</h3>
        <p v-if="stage.focus" class="text-sm text-ink-600 mt-1 mb-4">
          <span class="font-semibold text-ink">Focus:</span> {{ stage.focus }}
        </p>

        <div class="space-y-4">
          <div v-for="milestone in stage.milestones" :key="milestone.id" class="pl-1">
            <p class="font-semibold text-ink flex items-start gap-2">
              <span class="text-teal-600 shrink-0">&#10070;</span>
              <span>{{ milestone.name || 'Untitled milestone' }}</span>
            </p>
            <p v-if="milestone.description" class="text-sm text-ink-600 pl-5 mt-0.5">
              {{ milestone.description }}
            </p>
            <p class="text-xs font-mono text-ink-400 pl-5 mt-0.5">
              Estimated time: {{ milestone.hours }} hours
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center mt-4 pt-2 border-t border-ink-100 text-sm">
          <span class="font-semibold text-ink">Total for {{ stage.title }}</span>
          <span class="font-mono font-semibold text-teal-700">{{ stageHours(stage) }} hours</span>
        </div>
      </div>

      <div class="flex justify-between items-center mt-10 pt-4 border-t-2 border-ink">
        <span class="font-display font-bold text-ink">Total estimated time</span>
        <span class="font-mono text-xl font-bold text-teal-700">{{ totalHours }} hours</span>
      </div>
    </div>
  </div>
</template>
