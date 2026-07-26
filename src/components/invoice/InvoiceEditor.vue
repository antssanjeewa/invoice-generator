<script setup>
import { CLIENTS } from '@/config/clients'

defineProps({
  selectedClient: { type: Object, required: true },
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: String, required: true },
  tasks: { type: Array, required: true },
  lineTotal: { type: Function, required: true },
  grandTotal: { type: Number, required: true }
})

const emit = defineEmits([
  'update:selectedClient',
  'update:invoiceNumber',
  'update:invoiceDate',
  'add-task',
  'remove-task',
  'print'
])
</script>

<template>
  <div class="panel">
    <h2 class="text-sm font-semibold text-ink mb-4">Invoice details</h2>

    <div class="mb-4">
      <label class="field-label">Billed to</label>
      <select
        class="field-input"
        :value="selectedClient.id"
        @change="
          emit(
            'update:selectedClient',
            CLIENTS.find((c) => c.id === $event.target.value)
          )
        "
      >
        <option v-for="client in CLIENTS" :key="client.id" :value="client.id">
          {{ client.name }}
        </option>
      </select>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="field-label">Invoice number</label>
        <input
          class="field-input"
          type="text"
          :value="invoiceNumber"
          @input="emit('update:invoiceNumber', $event.target.value)"
        />
      </div>
      <div>
        <label class="field-label">Date</label>
        <input
          class="field-input"
          type="date"
          :value="invoiceDate"
          @input="emit('update:invoiceDate', $event.target.value)"
        />
      </div>
    </div>
  </div>

  <div class="panel">
    <h2 class="text-sm font-semibold text-ink mb-4">Tasks</h2>

    <div class="space-y-4">
      <div v-for="task in tasks" :key="task.id" class="border border-ink-100 rounded-lg p-4">
        <label class="field-label">Description</label>
        <input v-model="task.description" type="text" placeholder="What was the work?" class="field-input mb-3" />

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="field-label">Hours</label>
            <input v-model.number="task.hours" type="number" min="0" step="0.5" class="field-input" />
          </div>
          <div>
            <label class="field-label">Rate (LKR)</label>
            <input v-model.number="task.rate" type="number" min="0" class="field-input" />
          </div>
          <div>
            <label class="field-label">Line total</label>
            <div class="field-input bg-ink-50 font-mono text-xs flex items-center">
              {{ lineTotal(task).toFixed(2) }}
            </div>
          </div>
        </div>

        <button
          v-if="tasks.length > 1"
          class="btn-ghost-danger mt-3"
          @click="emit('remove-task', task.id)"
        >
          Remove task
        </button>
      </div>
    </div>

    <button class="btn-secondary w-full mt-4" @click="emit('add-task')">+ Add task</button>
  </div>

  <div class="panel">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-sm font-semibold text-ink">Grand total</h2>
      <div class="font-mono text-lg font-bold text-teal-700">LKR {{ grandTotal.toFixed(2) }}</div>
    </div>
    <button class="btn-primary w-full" @click="emit('print')">Print / Save as PDF</button>
  </div>
</template>
