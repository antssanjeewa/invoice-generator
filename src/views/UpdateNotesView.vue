<script setup>
import { computed } from 'vue'
import ToolPage from '@/components/common/ToolPage.vue'
import UpdateNotesEditor from '@/components/updates/UpdateNotesEditor.vue'
import UpdateNotesPreview from '@/components/updates/UpdateNotesPreview.vue'
import TopActionBar from '@/components/invoice/TopActionBar.vue'
import { useUpdateNotes } from '@/composables/useUpdateNotes'
import { usePrint } from '@/composables/usePrint'

const {
  docTitle,
  docSubtitle,
  noteDate,
  author,
  forClient,
  sections,
  addSection,
  removeSection,
  addPoint,
  removePoint,
  updatePoint,
  addSubPoint,
  removeSubPoint
} = useUpdateNotes()

const { printDocument } = usePrint()

const handleAddPoint = (section, pointData) => {
  addPoint(section, pointData)
}

const handleUpdatePoint = (section, pointId, pointData) => {
  updatePoint(section, pointId, pointData)
}

// Calculate total points for the action bar
const totalPoints = computed(() => {
  return sections.value.reduce((total, section) => {
    return total + section.points.length
  }, 0)
})
</script>

<template>
  <div>
    <ToolPage
      title="Update Notes"
      subtitle="Summarize what shipped, in plain language for the client"
    >
      <template #editor>
        <UpdateNotesEditor
          v-model:doc-title="docTitle"
          v-model:doc-subtitle="docSubtitle"
          v-model:note-date="noteDate"
          v-model:author="author"
          v-model:for-client="forClient"
          :sections="sections"
          @add-section="addSection"
          @remove-section="removeSection"
          @add-point="handleAddPoint"
          @remove-point="removePoint"
          @update-point="handleUpdatePoint"
          @add-sub-point="addSubPoint"
          @remove-sub-point="removeSubPoint"
        />
      </template>
      <template #preview>
        <UpdateNotesPreview
          :doc-title="docTitle"
          :doc-subtitle="docSubtitle"
          :note-date="noteDate"
          :author="author"
          :for-client="forClient"
          :sections="sections"
        />
      </template>
    </ToolPage>
  </div>
</template>
