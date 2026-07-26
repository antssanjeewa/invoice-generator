<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  task: { type: Object, default: null },
  isEditing: { type: Boolean, default: false },
  defaultRate: { type: Number, default: 0 }
})

const emit = defineEmits(['close', 'save'])

const formData = ref({
  description: '',
  hours: 0,
  rate: 0
})

// Watch for task prop changes to populate form
watch(() => props.task, (newTask) => {
  if (newTask) {
    formData.value = {
      description: newTask.description,
      hours: newTask.hours,
      rate: newTask.rate
    }
  } else {
    formData.value = {
      description: '',
      hours: 0,
      rate: props.defaultRate
    }
  }
}, { immediate: true })

const handleSave = () => {
  emit('save', { ...formData.value })
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="no-print fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4"
        @click="handleClose"
      >
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="bg-white rounded-xl shadow-paper w-full max-w-md"
            @click.stop
          >
            <div class="px-6 py-4 border-b border-ink-100">
              <h3 class="text-lg font-semibold text-ink">
                {{ isEditing ? 'Edit Task' : 'Add New Task' }}
              </h3>
            </div>

            <div class="p-6 space-y-4">
              <div>
                <label class="field-label">Description</label>
                <input
                  v-model="formData.description"
                  type="text"
                  placeholder="What was the work?"
                  class="field-input"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="field-label">Hours</label>
                  <input
                    v-model.number="formData.hours"
                    type="number"
                    min="0"
                    step="0.5"
                    class="field-input"
                  />
                </div>
                <div>
                  <label class="field-label">Rate (LKR)</label>
                  <input
                    v-model.number="formData.rate"
                    type="number"
                    min="0"
                    class="field-input"
                  />
                </div>
              </div>

              <div class="bg-ink-50 rounded-md p-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-ink-600">Line Total</span>
                  <span class="font-mono font-semibold text-teal-700">
                    LKR {{ ((formData.hours || 0) * (formData.rate || 0)).toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="px-6 py-4 border-t border-ink-100 flex justify-end gap-3">
              <button
                @click="handleClose"
                class="btn-secondary"
              >
                Cancel
              </button>
              <button
                @click="handleSave"
                :disabled="!formData.description.trim()"
                class="btn-primary"
              >
                {{ isEditing ? 'Save Changes' : 'Add Task' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
