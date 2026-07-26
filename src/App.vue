<script setup>
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-ink-50 flex flex-col lg:flex-row">
    <AppSidebar />
    <main class="flex-1 min-w-0">
      <RouterView />
    </main>
  </div>
</template>
