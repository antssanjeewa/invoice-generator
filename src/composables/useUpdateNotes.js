import { ref } from 'vue'
import { MY_INFO } from '@/config/myInfo'

let nextSectionId = 1
let nextPointId = 1

const newPoint = () => ({
  id: nextPointId++,
  text: '',
  subPoints: []
})

const newSection = () => ({
  id: nextSectionId++,
  heading: '',
  points: [newPoint()]
})

export function useUpdateNotes() {
  const docTitle = ref('Office Web Application')
  const docSubtitle = ref('Update notes')
  const noteDate = ref(new Date().toISOString().slice(0, 10))
  const author = ref(MY_INFO.name)
  const forClient = ref('')

  const sections = ref([newSection()])

  const addSection = () => {
    sections.value.push(newSection())
  }

  const removeSection = (id) => {
    if (sections.value.length <= 1) return
    sections.value = sections.value.filter((s) => s.id !== id)
  }

  const addPoint = (section, pointData = null) => {
    if (pointData) {
      section.points.push({
        id: nextPointId++,
        text: pointData.text,
        subPoints: pointData.subPoints || []
      })
    } else {
      section.points.push(newPoint())
    }
  }

  const removePoint = (section, pointId) => {
    if (section.points.length <= 1) return
    section.points = section.points.filter((p) => p.id !== pointId)
  }

  const updatePoint = (section, pointId, pointData) => {
    const pointIndex = section.points.findIndex((p) => p.id === pointId)
    if (pointIndex !== -1) {
      section.points[pointIndex] = {
        ...section.points[pointIndex],
        text: pointData.text,
        subPoints: pointData.subPoints || []
      }
    }
  }

  const addSubPoint = (point) => {
    point.subPoints.push({ id: nextPointId++, text: '' })
  }

  const removeSubPoint = (point, subId) => {
    point.subPoints = point.subPoints.filter((sp) => sp.id !== subId)
  }

  return {
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
  }
}
