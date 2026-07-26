<script setup>
import { ref } from 'vue'
import { CLIENTS } from '@/config/clients'
import TaskModal from './TaskModal.vue'

defineProps({
  selectedClient: { type: Object, required: true },
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: String, required: true },
  tasks: { type: Array, required: true },
  lineTotal: { type: Function, required: true },
  grandTotal: { type: Number, required: true }
})

const emit = defineEmits([
  'update:selectedClient',
  'update:invoiceNumber',
  'update:invoiceDate',
  'add-task',
  'remove-task',
  'update-task'
])

// Modal state
const isModalOpen = ref(false)
const editingTask = ref(null)
const isEditing = ref(false)

const openAddModal = () => {
  editingTask.value = null
  isEditing.value = false
  isModalOpen.value = true
}

const openEditModal = (task) => {
  editingTask.value = task
  isEditing.value = true
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingTask.value = null
  isEditing.value = false
}

const handleSaveTask = (taskData) => {
  if (isEditing.value && editingTask.value) {
    emit('update-task', editingTask.value.id, taskData)
  } else {
    emit('add-task', taskData)
  }
  closeModal()
}

const handleDeleteTask = (taskId) => {
  emit('remove-task', taskId)
}
</script>

<template>
  <div class="panel">
    <h2 class="text-sm font-semibold text-ink mb-4">Invoice details</h2>

    <div class="mb-4">
      <label class="field-label">Billed to</label>
      <select
        class="field-input"
        :value="selectedClient.id"
        @change="
          emit(
            'update:selectedClient',
            CLIENTS.find((c) => c.id === $event.target.value)
          )
        "
      >
        <option v-for="client in CLIENTS" :key="client.id" :value="client.id">
          {{ client.name }}
        </option>
      </select>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="field-label">Invoice number</label>
        <input
          class="field-input"
          type="text"
          :value="invoiceNumber"
          @input="emit('update:invoiceNumber', $event.target.value)"
        />
      </div>
      <div>
        <label class="field-label">Date</label>
        <input
          class="field-input"
          type="date"
          :value="invoiceDate"
          @input="emit('update:invoiceDate', $event.target.value)"
        />
      </div>
    </div>
  </div>

  <div class="panel">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-sm font-semibold text-ink">Tasks</h2>
      <button
        @click="openAddModal"
        class="btn-secondary text-sm px-3 py-1.5"
      >
        + Add Task
      </button>
    </div>

    <!-- Compact Task Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-ink-100">
            <th class="text-left py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide">
              Description
            </th>
            <th class="text-center py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide w-16">
              Hours
            </th>
            <th class="text-right py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide w-24">
              Total
            </th>
            <th class="text-center py-2 px-2 text-xs font-semibold text-ink-400 uppercase tracking-wide w-20">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in tasks"
            :key="task.id"
            class="border-b border-ink-50 hover:bg-ink-50/50 transition-colors"
          >
            <td class="py-2 px-2 text-ink-800 truncate max-w-[200px]" :title="task.description">
              {{ task.description || '—' }}
            </td>
            <td class="py-2 px-2 text-center font-mono text-ink-600">
              {{ task.hours }}
            </td>
            <td class="py-2 px-2 text-right font-mono text-ink-800">
              LKR {{ lineTotal(task).toFixed(2) }}
            </td>
            <td class="py-2 px-2 text-center">
              <div class="flex items-center justify-center gap-1">
                <button
                  @click="openEditModal(task)"
                  class="p-1 text-ink-400 hover:text-teal-600 transition-colors"
                  title="Edit task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button
                  v-if="tasks.length > 1"
                  @click="handleDeleteTask(task.id)"
                  class="p-1 text-ink-400 hover:text-red-500 transition-colors"
                  title="Delete task"
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

    <div v-if="tasks.length === 0" class="text-center py-8 text-ink-400 text-sm">
      No tasks added yet. Click "+ Add Task" to get started.
    </div>
  </div>

  <!-- Task Modal -->
  <TaskModal
    :is-open="isModalOpen"
    :task="editingTask"
    :is-editing="isEditing"
    :default-rate="selectedClient.defaultRate"
    @close="closeModal"
    @save="handleSaveTask"
  />
</template>
