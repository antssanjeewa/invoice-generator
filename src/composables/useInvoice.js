// Invoice State Management Composable
// Handles all reactive state for invoice generation

import { ref, computed } from 'vue'
import { CLIENTS } from '../config/clients'

export function useInvoice() {
  // Selected client (defaults to first client)
  const selectedClient = ref(CLIENTS[0])

  // Auto-generated invoice number format: INV-YYYY-XXXX
  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 9000) + 1000
    return `INV-${year}-${random}`
  }

  const invoiceNumber = ref(generateInvoiceNumber())

  // Auto-filled with today's date YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const invoiceDate = ref(getTodayDate())

  // Tasks array with default sample tasks
  const tasks = ref([
    {
      description: 'Web Development Services',
      hours: 8,
      rate: 750,
    },
    {
      description: 'UI/UX Design',
      hours: 5,
      rate: 750,
    },
  ])

  // Add a new task
  const addTask = () => {
    tasks.value.push({
      description: '',
      hours: 0,
      rate: selectedClient.value.defaultRate,
    })
  }

  // Remove a task by index
  const removeTask = (index) => {
    if (tasks.value.length > 1) {
      tasks.value.splice(index, 1)
    }
  }

  // Computed: Grand Total (sum of hours * rate for all tasks)
  const grandTotal = computed(() => {
    return tasks.value.reduce((total, task) => {
      return total + (task.hours * task.rate)
    }, 0)
  })

  return {
    selectedClient,
    invoiceNumber,
    invoiceDate,
    tasks,
    addTask,
    removeTask,
    grandTotal,
  }
}
