<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  milestone: { type: Object, default: null },
  isEditing: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'save'])

const formData = ref({
  name: '',
  description: '',
  hours: 0
})

watch(() => props.milestone, (newMilestone) => {
  if (newMilestone) {
    formData.value = {
      name: newMilestone.name,
      description: newMilestone.description,
      hours: newMilestone.hours
    }
  } else {
    formData.value = {
      name: '',
      description: '',
      hours: 0
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
                {{ isEditing ? 'Edit Milestone' : 'Add New Milestone' }}
              </h3>
            </div>

            <div class="p-6 space-y-4">
              <div>
                <label class="field-label">Milestone Name</label>
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="e.g. User Authentication"
                  class="field-input"
                />
              </div>

              <div>
                <label class="field-label">Description</label>
                <textarea
                  v-model="formData.description"
                  rows="3"
                  placeholder="What this milestone involves"
                  class="field-textarea"
                />
              </div>

              <div>
                <label class="field-label">Est. Hours</label>
                <input
                  v-model.number="formData.hours"
                  type="number"
                  min="0"
                  step="0.5"
                  class="field-input"
                />
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
                :disabled="!formData.name.trim()"
                class="btn-primary"
              >
                {{ isEditing ? 'Save Changes' : 'Add Milestone' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
