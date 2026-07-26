<script setup>
import ToolPage from '@/components/common/ToolPage.vue'
import InvoiceEditor from '@/components/invoice/InvoiceEditor.vue'
import InvoicePreview from '@/components/invoice/InvoicePreview.vue'
import { useInvoice } from '@/composables/useInvoice'
import { usePrint } from '@/composables/usePrint'

const {
  selectedClient,
  invoiceNumber,
  invoiceDate,
  tasks,
  addTask,
  removeTask,
  lineTotal,
  grandTotal
} = useInvoice()

const { printDocument } = usePrint()
</script>

<template>
  <ToolPage title="Invoice" subtitle="Bill a client for completed work">
    <template #editor>
      <InvoiceEditor
        v-model:selected-client="selectedClient"
        v-model:invoice-number="invoiceNumber"
        v-model:invoice-date="invoiceDate"
        :tasks="tasks"
        :line-total="lineTotal"
        :grand-total="grandTotal"
        @add-task="addTask"
        @remove-task="removeTask"
        @print="printDocument"
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
</template>
