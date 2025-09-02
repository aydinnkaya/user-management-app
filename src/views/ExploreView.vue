<template>
  <div class="flex flex-col h-screen bg-black text-white overflow-hidden overscroll-none">
    <!-- Navigation bar -->
    <NavBar />

    <!-- Main Empty State / Discover Section -->
    <main class="flex-1 flex items-center justify-center px-4 overflow-hidden overscroll-none">
      <EmptyState
        :title="exploreTexts.noUsers.title"
        :message="exploreTexts.noUsers.message"
        :buttonText="exploreTexts.noUsers.buttonText"
        icon="/logo/leaderboard.svg"
        route="/"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import EmptyState from '@/components/EmptyState.vue'
import { exploreTexts } from '@/strings/appTexts'
</script>
