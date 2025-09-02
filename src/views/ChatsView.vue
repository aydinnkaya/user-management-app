<template>
  <div class="min-h-screen bg-black text-white flex flex-col">
    <!-- Navigation bar -->
    <NavBar />

    <!-- Main Empty Chat State Section -->
    <main class="flex-1 flex items-center justify-center px-4">
      <EmptyState
        :title="chatsTexts.noChats.title"
        :message="chatsTexts.noChats.message"
        :buttonText="chatsTexts.noChats.buttonText"
        icon="/logo/messages.svg"
        route="/"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import EmptyState from '@/components/EmptyState.vue'
import { chatsTexts } from '@/strings/appTexts'
</script>
