<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  point: { type: Object, default: null },
  isEditing: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'save'])

const formData = ref({
  text: '',
  subPoints: []
})

watch(() => props.point, (newPoint) => {
  if (newPoint) {
    formData.value = {
      text: newPoint.text,
      subPoints: newPoint.subPoints || []
    }
  } else {
    formData.value = {
      text: '',
      subPoints: []
    }
  }
}, { immediate: true })

const handleSave = () => {
  emit('save', { ...formData.value })
}

const handleClose = () => {
  emit('close')
}

const addSubPoint = () => {
  formData.value.subPoints.push({ text: '' })
}

const removeSubPoint = (index) => {
  formData.value.subPoints.splice(index, 1)
}

const updateSubPoint = (index, value) => {
  formData.value.subPoints[index].text = value
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
            class="bg-white rounded-xl shadow-paper w-full max-w-md max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <div class="px-6 py-4 border-b border-ink-100">
              <h3 class="text-lg font-semibold text-ink">
                {{ isEditing ? 'Edit Point' : 'Add New Point' }}
              </h3>
            </div>

            <div class="p-6 space-y-4">
              <div>
                <label class="field-label">Update Point</label>
                <textarea
                  v-model="formData.text"
                  rows="3"
                  placeholder="What was updated?"
                  class="field-textarea"
                />
              </div>

              <div v-if="formData.subPoints.length > 0" class="space-y-2">
                <label class="field-label">Sub-points</label>
                <div
                  v-for="(sub, index) in formData.subPoints"
                  :key="index"
                  class="flex items-start gap-2"
                >
                  <input
                    :model-value="sub.text"
                    @input="updateSubPoint(index, $event.target.value)"
                    type="text"
                    placeholder="Sub-point detail"
                    class="field-input flex-1 text-xs"
                  />
                  <button
                    @click="removeSubPoint(index)"
                    class="btn-ghost-danger mt-2 shrink-0"
                  >
                    &times;
                  </button>
                </div>
              </div>

              <button
                @click="addSubPoint"
                class="text-xs font-medium text-teal-700 hover:text-teal-900"
              >
                + Add sub-point
              </button>
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
                :disabled="!formData.text.trim()"
                class="btn-primary"
              >
                {{ isEditing ? 'Save Changes' : 'Add Point' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
