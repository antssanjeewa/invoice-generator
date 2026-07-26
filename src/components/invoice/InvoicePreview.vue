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
  <div class="paper overflow-hidden print-area">
    <!-- Lavender header band -->
    <div class="bg-plum-50 px-10 pt-12 pb-8">
      <!-- <p class="text-ink-400 text-sm mb-6 font-mono text-end">{{ invoiceNumber }}</p> -->
      <h1 class="text-6xl font-display font-black text-plum-900 tracking-tight text-center">
        INVOICE
      </h1>
      <div class="mt-8 space-y-1.5">
        <div class="border-t-2 border-plum-900"></div>
        <div class="border-t border-plum-900"></div>
      </div>
    </div>

    <!-- Body -->
    <div class="px-10 py-8">
      <div class="flex justify-between items-start mb-8">
        <div>
          <h3 class="text-xs font-bold text-plum-900 uppercase tracking-wide mt-5">
            {{ MY_INFO.name }}
          </h3>
          <p class="text-sm text-ink-600">{{ MY_INFO.address_line1 }}</p>
          <p class="text-sm text-ink-600">{{ MY_INFO.address_line2 }}</p>
          <p class="text-sm text-ink-600">{{ MY_INFO.address_line3 }}</p>
          <p class="text-sm text-ink-600">{{ MY_INFO.phone }}</p>
        </div>
        <div>
          <h3 class="text-xs font-bold text-plum-900 uppercase tracking-wide mb-1.5">Billed to</h3>
          <p class="font-semibold text-ink-800">{{ selectedClient.name }}</p>
          <p class="text-sm text-ink-600">{{ selectedClient.address_line1 }}</p>
          <p class="text-sm text-ink-600">{{ selectedClient.address_line2 }}</p>
          <p class="text-sm text-ink-600">{{ selectedClient.address_line3 }}</p>
          <p class="text-sm">{{ invoiceDate }}</p>
        </div>
      </div>

      <table class="w-full mb-6 text-sm">
        <thead>
          <tr class="border-b-2 border-ink-800">
            <th class="text-left py-2 text-xs font-bold text-plum-900 uppercase tracking-wide">
              Description
            </th>
            <th class="text-center py-2 text-xs font-bold text-plum-900 uppercase tracking-wide w-20">
              Hours
            </th>
            <th class="text-right py-2 text-xs font-bold text-plum-900 uppercase tracking-wide w-32">
              Amount (LKR)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in tasks"
            :key="task.id"
            class="border-b border-ink-100"
          >
            <td class="py-3 text-ink-800">{{ task.description || '—' }}</td>
            <td class="py-3 text-center font-mono text-ink-600">{{ task.hours }}</td>
            <td class="py-3 text-right font-mono text-ink-800">{{ lineTotal(task).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end mb-10">
        <div class="w-1/2">
          <div class="flex justify-between items-center py-2 border-b-4 border-double border-ink-800">
            <span class="text-sm font-bold text-plum-900 uppercase tracking-wide">Total due</span>
            <span class="font-mono text-lg font-bold text-ink-800">{{ grandTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-end">
        <!-- <div class="text-sm space-y-1">
          <p><span class="font-semibold text-ink-700">Bank:</span> {{ MY_INFO.bankDetails.bankName }}</p>
          <p>
            <span class="font-semibold text-ink-700">Acc. number:</span>
            {{ MY_INFO.bankDetails.accountNumber }}
          </p>
          <p><span class="font-semibold text-ink-700">Branch:</span> {{ MY_INFO.bankDetails.branch }}</p>
        </div> -->

        <div class="p-4 text-sm w-1/2">
          <h3 class="text-xs font-bold text-plum-900 uppercase tracking-wide mb-2">
            Payment information
          </h3>
          <div class="grid grid-cols-2 gap-y-1">
            <p><span class="font-medium text-ink-600">Bank</span></p>
            <p class="text-ink">{{ MY_INFO.bankDetails.bankName }}</p>
            <p><span class="font-medium text-ink-600">Account no.</span></p>
            <p class="font-mono text-ink">{{ MY_INFO.bankDetails.accountNumber }}</p>
            <p><span class="font-medium text-ink-600">Branch</span></p>
            <p class="text-ink">{{ MY_INFO.bankDetails.branch }}</p>
            <p><span class="font-medium text-ink-600">Account holder</span></p>
            <p class="text-ink">{{ MY_INFO.bankDetails.accountHolderName }}</p>
          </div>
        </div>

        <p class="text-4xl font-display font-black text-ink-100 tracking-tight shrink-0">
          THANK YOU
        </p>
      </div>
    </div>
  </div>
</template>
