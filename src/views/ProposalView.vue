<script setup>
import ToolPage from '@/components/common/ToolPage.vue'
import ProposalEditor from '@/components/proposal/ProposalEditor.vue'
import ProposalPreview from '@/components/proposal/ProposalPreview.vue'
import { useProposal } from '@/composables/useProposal'
import { usePrint } from '@/composables/usePrint'

const {
  projectTitle,
  projectSubtitle,
  proposalDate,
  preparedFor,
  preparedBy,
  stages,
  addStage,
  removeStage,
  addMilestone,
  removeMilestone,
  stageHours,
  totalHours
} = useProposal()

const { printDocument } = usePrint()
</script>

<template>
  <ToolPage title="Proposal" subtitle="Scope new work into stages and milestones">
    <template #editor>
      <ProposalEditor
        v-model:project-title="projectTitle"
        v-model:project-subtitle="projectSubtitle"
        v-model:proposal-date="proposalDate"
        v-model:prepared-for="preparedFor"
        v-model:prepared-by="preparedBy"
        :stages="stages"
        :stage-hours="stageHours"
        :total-hours="totalHours"
        @add-stage="addStage"
        @remove-stage="removeStage"
        @add-milestone="addMilestone"
        @remove-milestone="removeMilestone"
        @print="printDocument"
      />
    </template>
    <template #preview>
      <ProposalPreview
        :project-title="projectTitle"
        :project-subtitle="projectSubtitle"
        :proposal-date="proposalDate"
        :prepared-for="preparedFor"
        :prepared-by="preparedBy"
        :stages="stages"
        :stage-hours="stageHours"
        :total-hours="totalHours"
      />
    </template>
  </ToolPage>
</template>
