<script setup>
import { watch } from 'vue'
import { useInvoice } from './composables/useInvoice'
import { MY_INFO } from './config/myInfo'
import { CLIENTS } from './config/clients'

// Use invoice composable for state management
const {
  selectedClient,
  invoiceNumber,
  invoiceDate,
  tasks,
  addTask,
  removeTask,
  grandTotal,
} = useInvoice()

// Watch for client changes to update default rates
watch(selectedClient, (newClient) => {
  tasks.value.forEach(task => {
    task.rate = newClient.defaultRate
  })
})

// Calculate line total for a task
const lineTotal = (task) => task.hours * task.rate

// Print invoice
const printInvoice = () => {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Invoice Generator</h1>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Side: Form Controls (no-print) -->
        <div class="no-print w-full lg:w-1/2 space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Invoice Details</h2>
            
            <!-- Client Selection -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-600 mb-2">Billed To</label>
              <select 
                v-model="selectedClient" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="client in CLIENTS" :key="client.id" :value="client">
                  {{ client.name }}
                </option>
              </select>
            </div>

            <!-- Invoice Number -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-600 mb-2">Invoice Number</label>
              <input 
                v-model="invoiceNumber" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <!-- Invoice Date -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-600 mb-2">Invoice Date</label>
              <input 
                v-model="invoiceDate" 
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <!-- Tasks Section -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Tasks</h2>
            
            <div class="space-y-4">
              <div v-for="(task, index) in tasks" :key="index" class="border border-gray-200 rounded-lg p-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <!-- Description -->
                  <div class="md:col-span-3">
                    <label class="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <input 
                      v-model="task.description" 
                      type="text" 
                      placeholder="Task description"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  
                  <!-- Hours -->
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Hours</label>
                    <input 
                      v-model.number="task.hours" 
                      type="number" 
                      min="0" 
                      step="0.5"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  
                  <!-- Rate -->
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Rate (LKR)</label>
                    <input 
                      v-model.number="task.rate" 
                      type="number" 
                      min="0"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  
                  <!-- Line Total -->
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Line Total</label>
                    <div class="px-3 py-2 bg-gray-100 rounded-md font-semibold text-gray-700">
                      LKR {{ lineTotal(task).toFixed(2) }}
                    </div>
                  </div>
                </div>
                
                <!-- Remove Task Button -->
                <button 
                  v-if="tasks.length > 1"
                  @click="removeTask(index)" 
                  class="mt-3 text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove Task
                </button>
              </div>
            </div>
            
            <!-- Add Task Button -->
            <button 
              @click="addTask" 
              class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Add Task
            </button>
          </div>

          <!-- Grand Total & Print Button -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-700">Grand Total</h2>
              <div class="text-2xl font-bold text-green-600">
                LKR {{ grandTotal.toFixed(2) }}
              </div>
            </div>
            
            <button 
              @click="printInvoice" 
              class="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Print / Download PDF
            </button>
          </div>
        </div>

        <!-- Right Side: Invoice Preview (print-area) -->
        <div class="print-area w-full lg:w-1/2">
          <div class="bg-white rounded-lg shadow-md p-8">
            <!-- Invoice Header -->
            <div class="flex justify-between items-start mb-8">
              <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">INVOICE</h1>
                <p class="text-gray-600">{{ invoiceNumber }}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-600">Date: {{ invoiceDate }}</p>
              </div>
            </div>

            <!-- From (My Info) -->
            <div class="mb-8">
              <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">From</h3>
              <p class="font-semibold text-gray-800">{{ MY_INFO.name }}</p>
              <p class="text-gray-600">{{ MY_INFO.address }}</p>
              <p class="text-gray-600">{{ MY_INFO.phone }}</p>
            </div>

            <!-- To (Client Info) -->
            <div class="mb-8">
              <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Billed To</h3>
              <p class="font-semibold text-gray-800">{{ selectedClient.name }}</p>
              <p class="text-gray-600">{{ selectedClient.address }}</p>
            </div>

            <!-- Tasks Table -->
            <div class="mb-8">
              <table class="w-full">
                <thead>
                  <tr class="border-b-2 border-gray-200">
                    <th class="text-left py-2 text-sm font-semibold text-gray-600">Description</th>
                    <th class="text-center py-2 text-sm font-semibold text-gray-600">Hours</th>
                    <th class="text-center py-2 text-sm font-semibold text-gray-600">Rate</th>
                    <th class="text-right py-2 text-sm font-semibold text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(task, index) in tasks" :key="index" class="border-b border-gray-100">
                    <td class="py-3 text-gray-700">{{ task.description }}</td>
                    <td class="py-3 text-center text-gray-700">{{ task.hours }}</td>
                    <td class="py-3 text-center text-gray-700">LKR {{ task.rate.toFixed(2) }}</td>
                    <td class="py-3 text-right text-gray-700">LKR {{ lineTotal(task).toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Grand Total -->
            <div class="flex justify-end mb-8">
              <div class="w-1/2">
                <div class="flex justify-between items-center py-2 border-t-2 border-gray-800">
                  <span class="text-lg font-semibold text-gray-800">Grand Total</span>
                  <span class="text-xl font-bold text-gray-800">LKR {{ grandTotal.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Bank Details -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-sm font-semibold text-gray-500 uppercase mb-3">Payment Details</h3>
              <div class="space-y-1 text-sm">
                <p><span class="font-medium text-gray-700">Bank:</span> {{ MY_INFO.bankDetails.bankName }}</p>
                <p><span class="font-medium text-gray-700">Account Number:</span> {{ MY_INFO.bankDetails.accountNumber }}</p>
                <p><span class="font-medium text-gray-700">Branch:</span> {{ MY_INFO.bankDetails.branch }}</p>
                <p><span class="font-medium text-gray-700">Account Holder:</span> {{ MY_INFO.bankDetails.accountHolderName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
