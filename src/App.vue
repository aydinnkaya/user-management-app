<template>
  <div
    id="app"
    class="h-screen w-full bg-appbg text-white overflow-y-auto overscroll-none overscroll-y-none fixed inset-0"
  >
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
