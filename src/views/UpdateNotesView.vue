<script setup>
import ToolPage from '@/components/common/ToolPage.vue'
import UpdateNotesEditor from '@/components/updates/UpdateNotesEditor.vue'
import UpdateNotesPreview from '@/components/updates/UpdateNotesPreview.vue'
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
  addSubPoint,
  removeSubPoint
} = useUpdateNotes()

const { printDocument } = usePrint()
</script>

<template>
  <ToolPage title="Update Notes" subtitle="Summarize what shipped, in plain language for the client">
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
        @add-point="addPoint"
        @remove-point="removePoint"
        @add-sub-point="addSubPoint"
        @remove-sub-point="removeSubPoint"
        @print="printDocument"
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
</template>
