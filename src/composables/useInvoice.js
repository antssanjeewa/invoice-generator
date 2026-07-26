import { ref, computed, watch } from 'vue'
import { CLIENTS, BLANK_CLIENT } from '@/config/clients'

let nextId = 1
const newTask = (rate = 0) => ({
  id: nextId++,
  description: '',
  hours: 0,
  rate
})

export function useInvoice() {
  const selectedClient = ref(CLIENTS[0] || BLANK_CLIENT)
  const invoiceNumber = ref(`INV-${new Date().getFullYear()}-001`)
  const invoiceDate = ref(new Date().toISOString().slice(0, 10))
  const tasks = ref([newTask(selectedClient.value.defaultRate)])

  // When the client changes, prefill new-line rates (existing lines keep
  // whatever the user already typed, so we don't clobber real edits).
  watch(selectedClient, (client) => {
    invoiceNumber.value = invoiceNumber.value
    tasks.value.forEach((task) => {
      if (!task.description && task.hours === 0) {
        task.rate = client.defaultRate
      }
    })
  })

  const addTask = (taskData = null) => {
    if (taskData) {
      tasks.value.push({
        id: nextId++,
        description: taskData.description,
        hours: taskData.hours,
        rate: taskData.rate
      })
    } else {
      tasks.value.push(newTask(selectedClient.value.defaultRate))
    }
  }

  const removeTask = (id) => {
    if (tasks.value.length <= 1) return
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  const updateTask = (id, taskData) => {
    const taskIndex = tasks.value.findIndex((t) => t.id === id)
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = {
        ...tasks.value[taskIndex],
        description: taskData.description,
        hours: taskData.hours,
        rate: taskData.rate
      }
    }
  }

  const lineTotal = (task) => (Number(task.hours) || 0) * (Number(task.rate) || 0)

  const grandTotal = computed(() =>
    tasks.value.reduce((sum, task) => sum + lineTotal(task), 0)
  )

  return {
    selectedClient,
    invoiceNumber,
    invoiceDate,
    tasks,
    addTask,
    removeTask,
    updateTask,
    lineTotal,
    grandTotal
  }
}
