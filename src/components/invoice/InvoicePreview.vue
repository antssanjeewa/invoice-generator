<script setup>
import { MY_INFO } from '@/config/myInfo'

defineProps({
  selectedClient: { type: Object, required: true },
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: String, required: true },
  tasks: { type: Array, required: true },
  lineTotal: { type: Function, required: true },
  grandTotal: { type: Number, required: true }
})
</script>

<template>
  <div class="paper max-w-2xl mx-auto p-10">
    <div class="flex justify-between items-start mb-10">
      <div>
        <h1 class="text-4xl font-display font-extrabold text-ink tracking-tight">Invoice</h1>
        <p class="text-ink-400 text-sm mt-1 font-mono">{{ invoiceNumber }}</p>
      </div>
      <div class="text-right text-sm text-ink-400">
        <p>Date</p>
        <p class="text-ink font-medium">{{ invoiceDate }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 mb-8">
      <div>
        <h3 class="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-1.5">From</h3>
        <p class="font-semibold text-ink">{{ MY_INFO.name }}</p>
        <p class="text-sm text-ink-600">{{ MY_INFO.address }}</p>
        <p class="text-sm text-ink-600">{{ MY_INFO.phone }}</p>
      </div>
      <div>
        <h3 class="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-1.5">Billed to</h3>
        <p class="font-semibold text-ink">{{ selectedClient.name }}</p>
        <p class="text-sm text-ink-600">{{ selectedClient.address }}</p>
      </div>
    </div>

    <table class="w-full mb-8 text-sm">
      <thead>
        <tr class="border-b-2 border-ink text-xs uppercase tracking-wide text-ink-400">
          <th class="text-left py-2 font-semibold">Description</th>
          <th class="text-center py-2 font-semibold w-16">Hrs</th>
          <th class="text-right py-2 font-semibold w-28">Rate</th>
          <th class="text-right py-2 font-semibold w-32">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" class="border-b border-ink-100">
          <td class="py-3 text-ink-800">{{ task.description || '—' }}</td>
          <td class="py-3 text-center font-mono text-ink-600">{{ task.hours }}</td>
          <td class="py-3 text-right font-mono text-ink-600">{{ Number(task.rate).toFixed(2) }}</td>
          <td class="py-3 text-right font-mono text-ink font-medium">{{ lineTotal(task).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-end mb-10">
      <div class="w-1/2 flex justify-between items-center py-3 border-t-2 border-ink">
        <span class="font-semibold text-ink">Total due</span>
        <span class="font-mono text-xl font-bold text-teal-700">LKR {{ grandTotal.toFixed(2) }}</span>
      </div>
    </div>

    <div class="bg-ink-50 rounded-lg p-4 text-sm">
      <h3 class="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-2">Payment details</h3>
      <div class="grid grid-cols-2 gap-y-1">
        <p><span class="font-medium text-ink-600">Bank</span></p>
        <p class="text-right text-ink">{{ MY_INFO.bankDetails.bankName }}</p>
        <p><span class="font-medium text-ink-600">Account no.</span></p>
        <p class="text-right font-mono text-ink">{{ MY_INFO.bankDetails.accountNumber }}</p>
        <p><span class="font-medium text-ink-600">Branch</span></p>
        <p class="text-right text-ink">{{ MY_INFO.bankDetails.branch }}</p>
        <p><span class="font-medium text-ink-600">Account holder</span></p>
        <p class="text-right text-ink">{{ MY_INFO.bankDetails.accountHolderName }}</p>
      </div>
    </div>
  </div>
</template>
