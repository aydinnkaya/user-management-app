<template>
  <div id="app" class="flex flex-col min-h-screen h-screen bg-black text-white overflow-hidden">
    <div id="scroll-container" class="flex-1 overflow-y-auto overscroll-none">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
