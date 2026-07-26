<script setup>
defineProps({
  docTitle: { type: String, required: true },
  docSubtitle: { type: String, required: true },
  noteDate: { type: String, required: true },
  author: { type: String, required: true },
  forClient: { type: String, required: true },
  sections: { type: Array, required: true }
})

const emit = defineEmits([
  'update:docTitle',
  'update:docSubtitle',
  'update:noteDate',
  'update:author',
  'update:forClient',
  'add-section',
  'remove-section',
  'add-point',
  'remove-point',
  'add-sub-point',
  'remove-sub-point',
  'print'
])
</script>

<template>
  <div class="panel">
    <h2 class="text-sm font-semibold text-ink mb-4">Note details</h2>

    <div class="mb-3">
      <label class="field-label">Title</label>
      <input
        class="field-input"
        type="text"
        :value="docTitle"
        @input="emit('update:docTitle', $event.target.value)"
      />
    </div>
    <div class="mb-3">
      <label class="field-label">Subtitle</label>
      <input
        class="field-input"
        type="text"
        placeholder="e.g. What's new this update"
        :value="docSubtitle"
        @input="emit('update:docSubtitle', $event.target.value)"
      />
    </div>

    <div class="grid grid-cols-2 gap-3 mb-3">
      <div>
        <label class="field-label">Date</label>
        <input
          class="field-input"
          type="date"
          :value="noteDate"
          @input="emit('update:noteDate', $event.target.value)"
        />
      </div>
      <div>
        <label class="field-label">Author</label>
        <input
          class="field-input"
          type="text"
          :value="author"
          @input="emit('update:author', $event.target.value)"
        />
      </div>
    </div>

    <div>
      <label class="field-label">For client (optional)</label>
      <input
        class="field-input"
        type="text"
        placeholder="e.g. Shraddha Media Network"
        :value="forClient"
        @input="emit('update:forClient', $event.target.value)"
      />
    </div>
  </div>

  <div v-for="section in sections" :key="section.id" class="panel">
    <div class="flex items-center justify-between mb-3">
      <input v-model="section.heading" type="text" class="field-input font-medium" placeholder="Section heading" />
      <button v-if="sections.length > 1" class="btn-ghost-danger ml-3 shrink-0" @click="emit('remove-section', section.id)">
        Remove
      </button>
    </div>

    <div class="space-y-3">
      <div v-for="point in section.points" :key="point.id">
        <div class="flex items-start gap-2">
          <input v-model="point.text" type="text" class="field-input flex-1" placeholder="Update point" />
          <button
            v-if="section.points.length > 1"
            class="btn-ghost-danger mt-2.5 shrink-0"
            @click="emit('remove-point', section, point.id)"
          >
            &times;
          </button>
        </div>

        <div class="pl-5 mt-2 space-y-2">
          <div v-for="sub in point.subPoints" :key="sub.id" class="flex items-start gap-2">
            <input v-model="sub.text" type="text" class="field-input flex-1 text-xs" placeholder="Sub-point" />
            <button class="btn-ghost-danger mt-2 shrink-0" @click="emit('remove-sub-point', point, sub.id)">
              &times;
            </button>
          </div>
          <button class="text-xs font-medium text-teal-700 hover:text-teal-900" @click="emit('add-sub-point', point)">
            + Add sub-point
          </button>
        </div>
      </div>
    </div>

    <button class="btn-secondary w-full mt-4" @click="emit('add-point', section)">+ Add point</button>
  </div>

  <button class="btn-secondary w-full" @click="emit('add-section')">+ Add section</button>

  <div class="panel">
    <button class="btn-primary w-full" @click="emit('print')">Print / Save as PDF</button>
  </div>
</template>
