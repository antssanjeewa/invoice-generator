<script setup>
import { ref } from 'vue'
import PointModal from './PointModal.vue'

defineProps({
  docTitle: { type: String, required: true },
  docSubtitle: { type: String, required: true },
  noteDate: { type: String, required: true },
  author: { type: String, required: true },
  forClient: { type: String, required: true },
  sections: { type: Array, required: true }
})

const emit = defineEmits([
  'update:docTitle',
  'update:docSubtitle',
  'update:noteDate',
  'update:author',
  'update:forClient',
  'add-section',
  'remove-section',
  'add-point',
  'remove-point',
  'update-point',
  'add-sub-point',
  'remove-sub-point'
])

// Modal state
const isModalOpen = ref(false)
const editingPoint = ref(null)
const editingSection = ref(null)
const isEditing = ref(false)

const openAddModal = (section) => {
  editingPoint.value = null
  editingSection.value = section
  isEditing.value = false
  isModalOpen.value = true
}

const openEditModal = (section, point) => {
  editingPoint.value = point
  editingSection.value = section
  isEditing.value = true
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingPoint.value = null
  editingSection.value = null
  isEditing.value = false
}

const handleSavePoint = (pointData) => {
  if (isEditing.value && editingPoint.value && editingSection.value) {
    emit('update-point', editingSection.value, editingPoint.value.id, pointData)
  } else if (editingSection.value) {
    emit('add-point', editingSection.value, pointData)
  }
  closeModal()
}

const handleDeletePoint = (section, pointId) => {
  emit('remove-point', section, pointId)
}
</script>

<template>
  <div class="panel">
    <h2 class="text-sm font-semibold text-ink mb-4">Note details</h2>

    <div class="mb-3">
      <label class="field-label">Title</label>
      <input
        class="field-input"
        type="text"
        :value="docTitle"
        @input="emit('update:docTitle', $event.target.value)"
      />
    </div>
    <div class="mb-3">
      <label class="field-label">Subtitle</label>
      <input
        class="field-input"
        type="text"
        placeholder="e.g. What's new this update"
        :value="docSubtitle"
        @input="emit('update:docSubtitle', $event.target.value)"
      />
    </div>

    <div class="grid grid-cols-2 gap-3 mb-3">
      <div>
        <label class="field-label">Date</label>
        <input
          class="field-input"
          type="date"
          :value="noteDate"
          @input="emit('update:noteDate', $event.target.value)"
        />
      </div>
      <div>
        <label class="field-label">Author</label>
        <input
          class="field-input"
          type="text"
          :value="author"
          @input="emit('update:author', $event.target.value)"
        />
      </div>
    </div>

    <div>
      <label class="field-label">For client (optional)</label>
      <input
        class="field-input"
        type="text"
        placeholder="e.g. Shraddha Media Network"
        :value="forClient"
        @input="emit('update:forClient', $event.target.value)"
      />
    </div>
  </div>

  <div v-for="section in sections" :key="section.id" class="panel">
    <div class="flex items-center justify-between mb-3">
      <input v-model="section.heading" type="text" class="field-input font-medium" placeholder="Section heading" />
      <button v-if="sections.length > 1" class="btn-ghost-danger ml-3 shrink-0" @click="emit('remove-section', section.id)">
        Remove
      </button>
    </div>

    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xs font-semibold text-ink-400 uppercase tracking-wide">Update Points</h3>
      <button
        @click="openAddModal(section)"
        class="btn-secondary text-sm px-3 py-1"
      >
        + Add Point
      </button>
    </div>

    <!-- Compact Point Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-ink-100">
            <th class="text-left py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide">
              Point
            </th>
            <th class="text-center py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide w-20">
              Sub-points
            </th>
            <th class="text-center py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide w-20">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="point in section.points"
            :key="point.id"
            class="border-b border-ink-50 hover:bg-ink-50/50 transition-colors"
          >
            <td class="py-2 px-2 text-ink-800 truncate max-w-[250px]" :title="point.text">
              {{ point.text || '—' }}
            </td>
            <td class="py-2 px-2 text-center font-mono text-ink-600">
              {{ point.subPoints?.length || 0 }}
            </td>
            <td class="py-2 px-2 text-center">
              <div class="flex items-center justify-center gap-1">
                <button
                  @click="openEditModal(section, point)"
                  class="p-1 text-ink-400 hover:text-teal-600 transition-colors"
                  title="Edit point"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button
                  v-if="section.points.length > 1"
                  @click="handleDeletePoint(section, point.id)"
                  class="p-1 text-ink-400 hover:text-red-500 transition-colors"
                  title="Delete point"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

    <div v-if="section.points.length === 0" class="text-center py-4 text-ink-400 text-sm">
      No points added yet.
    </div>
  </div>

  <button class="btn-secondary w-full" @click="emit('add-section')">+ Add section</button>

  <!-- Point Modal -->
  <PointModal
    :is-open="isModalOpen"
    :point="editingPoint"
    :is-editing="isEditing"
    @close="closeModal"
    @save="handleSavePoint"
  />
</template>
