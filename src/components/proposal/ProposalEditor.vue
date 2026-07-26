<script setup>
import { ref } from 'vue'
import { CLIENTS } from '@/config/clients'
import MilestoneModal from './MilestoneModal.vue'
import ExpandCard from '../common/ExpandCard.vue'

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
  'update-milestone'
])

// Modal state
const isModalOpen = ref(false)
const editingMilestone = ref(null)
const editingStage = ref(null)
const isEditing = ref(false)

const openAddModal = (stage) => {
  editingMilestone.value = null
  editingStage.value = stage
  isEditing.value = false
  isModalOpen.value = true
}

const openEditModal = (stage, milestone) => {
  editingMilestone.value = milestone
  editingStage.value = stage
  isEditing.value = true
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingMilestone.value = null
  editingStage.value = null
  isEditing.value = false
}

const handleSaveMilestone = (milestoneData) => {
  if (isEditing.value && editingMilestone.value && editingStage.value) {
    emit('update-milestone', editingStage.value, editingMilestone.value.id, milestoneData)
  } else if (editingStage.value) {
    emit('add-milestone', editingStage.value, milestoneData)
  }
  closeModal()
}

const handleDeleteMilestone = (stage, milestoneId) => {
  emit('remove-milestone', stage, milestoneId)
}
</script>

<template>
  <expand-card title="Proposal details">
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
          <option
            v-for="client in CLIENTS"
            :key="client.id"
            :value="client.id"
          >
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
  </expand-card>

  <expand-card
    v-for="(stage, sIndex) in stages"
    :key="stage.id"
    class="panel"
    :title="`Stage ${sIndex + 1}`"
  >
    <template #action>
      <button
        v-if="stages.length > 1"
        class="btn-ghost-danger"
        @click="emit('remove-stage', stage.id)"
      >
        Remove stage
      </button>
    </template>

    <div class="grid grid-cols-1 gap-3 mb-4">
      <div>
        <label class="field-label">Stage title</label>
        <input
          v-model="stage.title"
          type="text"
          class="field-input"
          placeholder="STAGE 1: Module name"
        />
      </div>
      <div>
        <label class="field-label">Focus</label>
        <textarea
          v-model="stage.focus"
          rows="2"
          class="field-textarea"
          placeholder="What this stage delivers"
        ></textarea>
      </div>
    </div>

    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xs font-semibold text-ink-400 uppercase tracking-wide">Milestones</h3>
      <button
        @click="openAddModal(stage)"
        class="btn-secondary text-sm px-3 py-1"
      >
        + Add Milestone
      </button>
    </div>

    <!-- Compact Milestone Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-ink-100">
            <th class="text-left py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide">
              Name
            </th>
            <th class="text-left py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide">
              Description
            </th>
            <th class="text-center py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide w-16">
              Hours
            </th>
            <th class="text-center py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide w-20">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="milestone in stage.milestones"
            :key="milestone.id"
            class="border-b border-ink-50 hover:bg-ink-50/50 transition-colors"
          >
            <td
              class="py-2 px-2 text-ink-800 truncate max-w-[150px]"
              :title="milestone.name"
            >
              {{ milestone.name || '—' }}
            </td>
            <td
              class="py-2 px-2 text-ink-600 truncate max-w-[200px]"
              :title="milestone.description"
            >
              {{ milestone.description || '—' }}
            </td>
            <td class="py-2 px-2 text-center font-mono text-ink-600">
              {{ milestone.hours }}h
            </td>
            <td class="py-2 px-2 text-center">
              <div class="flex items-center justify-center gap-1">
                <button
                  @click="openEditModal(stage, milestone)"
                  class="p-1 text-ink-400 hover:text-teal-600 transition-colors"
                  title="Edit milestone"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button
                  v-if="stage.milestones.length > 1"
                  @click="handleDeleteMilestone(stage, milestone.id)"
                  class="p-1 text-ink-400 hover:text-red-500 transition-colors"
                  title="Delete milestone"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="stage.milestones.length === 0"
      class="text-center py-4 text-ink-400 text-sm"
    >
      No milestones added yet.
    </div>

    <div class="flex justify-between items-center mt-4 pt-3 border-t border-ink-100 text-sm">
      <span class="font-medium text-ink-600">Stage total</span>
      <span class="font-mono font-semibold text-teal-700">{{ stageHours(stage) }}h</span>
    </div>
  </expand-card>

  <button
    class="btn-secondary w-full"
    @click="emit('add-stage')"
  >+ Add stage</button>

  <!-- Milestone Modal -->
  <MilestoneModal
    :is-open="isModalOpen"
    :milestone="editingMilestone"
    :is-editing="isEditing"
    @close="closeModal"
    @save="handleSaveMilestone"
  />
</template>
