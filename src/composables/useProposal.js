import { ref, computed } from 'vue'
import { CLIENTS, BLANK_CLIENT } from '@/config/clients'
import { MY_INFO } from '@/config/myInfo'

let nextMilestoneId = 1
let nextStageId = 1

const newMilestone = () => ({
  id: nextMilestoneId++,
  name: '',
  description: '',
  hours: 0
})

const newStage = (index) => ({
  id: nextStageId++,
  title: `STAGE ${index}`,
  focus: '',
  milestones: [newMilestone()]
})

export function useProposal() {
  const projectTitle = ref('Software Development Proposal')
  const projectSubtitle = ref('')
  const proposalDate = ref(new Date().toISOString().slice(0, 10))
  const preparedFor = ref(CLIENTS[0] || BLANK_CLIENT)
  const preparedBy = ref(MY_INFO.name)

  const stages = ref([newStage(1)])

  const addStage = () => {
    stages.value.push(newStage(stages.value.length + 1))
  }

  const removeStage = (id) => {
    if (stages.value.length <= 1) return
    stages.value = stages.value.filter((s) => s.id !== id)
  }

  const addMilestone = (stage) => {
    stage.milestones.push(newMilestone())
  }

  const removeMilestone = (stage, milestoneId) => {
    if (stage.milestones.length <= 1) return
    stage.milestones = stage.milestones.filter((m) => m.id !== milestoneId)
  }

  const stageHours = (stage) =>
    stage.milestones.reduce((sum, m) => sum + (Number(m.hours) || 0), 0)

  const totalHours = computed(() =>
    stages.value.reduce((sum, stage) => sum + stageHours(stage), 0)
  )

  return {
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
  }
}
