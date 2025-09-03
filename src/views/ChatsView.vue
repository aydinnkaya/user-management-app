<template>
  <div class="min-h-screen bg-black text-white flex flex-col">
    <!-- Navigation bar -->
    <NavBar />

    <!-- Main Empty Chat State Section -->
    <main class="flex-1 flex items-center justify-center px-4">
      <EmptyState
        :title="$t('chats.noChats.title')"
        :message="$t('chats.noChats.message')"
        :buttonText="$t('chats.noChats.buttonText')"
        :spriteName="'message'"
        route="/"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import EmptyState from '@/components/EmptyState.vue'
</script>
