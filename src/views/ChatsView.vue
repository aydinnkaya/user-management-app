<template>
  <div class="min-h-screen bg-black text-white flex flex-col">
    <NavBar />

    <main class="flex-1 flex items-center justify-center px-4">
      <div class="text-center max-w-xl mx-auto">
        <div class="mx-auto mb-6 flex items-center justify-center">
          <svg
            class="w-16 h-16 sm:w-20 sm:h-20 text-blue-400"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h3v4l4-4h9a2 2 0 002-2V4a2 2 0 00-2-2zm-2 8H6V8h12v2zm0-4H6V4h12v2zm-6 8H6v-2h6v2z"
            />
          </svg>
        </div>

        <h1 class="text-2xl sm:text-3xl font-semibold mb-2">No chats yet</h1>
        <p class="text-neutral-400 text-sm sm:text-base mb-6">
          Start by exploring users and send your first message.
        </p>

        <router-link
          to="/"
          class="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
        >
          Explore Users
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
