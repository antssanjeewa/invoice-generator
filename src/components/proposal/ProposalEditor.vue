<script setup>
import { CLIENTS } from '@/config/clients'

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

const emit = defineEmits([
  'update:projectTitle',
  'update:projectSubtitle',
  'update:proposalDate',
  'update:preparedFor',
  'update:preparedBy',
  'add-stage',
  'remove-stage',
  'add-milestone',
  'remove-milestone',
  'print'
])
</script>

<template>
  <div class="panel">
    <h2 class="text-sm font-semibold text-ink mb-4">Proposal details</h2>

    <div class="mb-3">
      <label class="field-label">Title</label>
      <input
        class="field-input"
        type="text"
        :value="projectTitle"
        @input="emit('update:projectTitle', $event.target.value)"
      />
    </div>
    <div class="mb-3">
      <label class="field-label">Project / subtitle</label>
      <input
        class="field-input"
        type="text"
        placeholder="e.g. Donation Management System"
        :value="projectSubtitle"
        @input="emit('update:projectSubtitle', $event.target.value)"
      />
    </div>

    <div class="grid grid-cols-2 gap-3 mb-3">
      <div>
        <label class="field-label">Prepared for</label>
        <select
          class="field-input"
          :value="preparedFor.id"
          @change="emit('update:preparedFor', CLIENTS.find((c) => c.id === $event.target.value))"
        >
          <option v-for="client in CLIENTS" :key="client.id" :value="client.id">
            {{ client.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="field-label">Date</label>
        <input
          class="field-input"
          type="date"
          :value="proposalDate"
          @input="emit('update:proposalDate', $event.target.value)"
        />
      </div>
    </div>

    <div>
      <label class="field-label">Prepared by</label>
      <input
        class="field-input"
        type="text"
        :value="preparedBy"
        @input="emit('update:preparedBy', $event.target.value)"
      />
    </div>
  </div>

  <div v-for="(stage, sIndex) in stages" :key="stage.id" class="panel">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-sm font-semibold text-ink">Stage {{ sIndex + 1 }}</h2>
      <button v-if="stages.length > 1" class="btn-ghost-danger" @click="emit('remove-stage', stage.id)">
        Remove stage
      </button>
    </div>

    <div class="grid grid-cols-1 gap-3 mb-4">
      <div>
        <label class="field-label">Stage title</label>
        <input v-model="stage.title" type="text" class="field-input" placeholder="STAGE 1: Module name" />
      </div>
      <div>
        <label class="field-label">Focus</label>
        <textarea v-model="stage.focus" rows="2" class="field-textarea" placeholder="What this stage delivers"></textarea>
      </div>
    </div>

    <div class="space-y-3">
      <div
        v-for="milestone in stage.milestones"
        :key="milestone.id"
        class="border border-ink-100 rounded-lg p-3"
      >
        <input
          v-model="milestone.name"
          type="text"
          class="field-input mb-2"
          placeholder="Milestone name"
        />
        <textarea
          v-model="milestone.description"
          rows="2"
          class="field-textarea mb-2 text-xs"
          placeholder="What this involves"
        ></textarea>
        <div class="flex items-center gap-3">
          <div class="flex-1">
            <label class="field-label">Est. hours</label>
            <input v-model.number="milestone.hours" type="number" min="0" step="0.5" class="field-input" />
          </div>
          <button
            v-if="stage.milestones.length > 1"
            class="btn-ghost-danger mt-5"
            @click="emit('remove-milestone', stage, milestone.id)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <button class="btn-secondary w-full mt-3" @click="emit('add-milestone', stage)">+ Add milestone</button>

    <div class="flex justify-between items-center mt-4 pt-3 border-t border-ink-100 text-sm">
      <span class="font-medium text-ink-600">Stage total</span>
      <span class="font-mono font-semibold text-teal-700">{{ stageHours(stage) }}h</span>
    </div>
  </div>

  <button class="btn-secondary w-full" @click="emit('add-stage')">+ Add stage</button>

  <div class="panel">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-sm font-semibold text-ink">Total estimate</h2>
      <div class="font-mono text-lg font-bold text-teal-700">{{ totalHours }}h</div>
    </div>
    <button class="btn-primary w-full" @click="emit('print')">Print / Save as PDF</button>
  </div>
</template>
