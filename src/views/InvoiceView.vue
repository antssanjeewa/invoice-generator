<script setup>
import ToolPage from '@/components/common/ToolPage.vue'
import InvoiceEditor from '@/components/invoice/InvoiceEditor.vue'
import InvoicePreview from '@/components/invoice/InvoicePreview.vue'
import TopActionBar from '@/components/invoice/TopActionBar.vue'
import { useInvoice } from '@/composables/useInvoice'
import { usePrint } from '@/composables/usePrint'

const {
  selectedClient,
  invoiceNumber,
  invoiceDate,
  tasks,
  addTask,
  removeTask,
  updateTask,
  lineTotal,
  grandTotal
} = useInvoice()

const { printDocument } = usePrint()

const handleAddTask = (taskData) => {
  addTask(taskData)
}

const handleUpdateTask = (taskId, taskData) => {
  updateTask(taskId, taskData)
}
</script>

<template>
  <div>
    <ToolPage
      title="Invoice"
      subtitle="Bill a client for completed work"
    >
      <template #editor>
        <InvoiceEditor
          v-model:selected-client="selectedClient"
          v-model:invoice-number="invoiceNumber"
          v-model:invoice-date="invoiceDate"
          :tasks="tasks"
          :line-total="lineTotal"
          :grand-total="grandTotal"
          @add-task="handleAddTask"
          @remove-task="removeTask"
          @update-task="handleUpdateTask"
        />
      </template>
      <template #preview>
        <InvoicePreview
          :selected-client="selectedClient"
          :invoice-number="invoiceNumber"
          :invoice-date="invoiceDate"
          :tasks="tasks"
          :line-total="lineTotal"
          :grand-total="grandTotal"
        />
      </template>
    </ToolPage>
  </div>
</template>
