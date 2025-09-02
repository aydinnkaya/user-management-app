<template class="o">
  <div class="flex flex-col h-screen bg-black text-white overflow-hidden overscroll-none">
    <!-- Navigation bar -->
    <NavBar />

    <!-- Main Empty State / Discover Section -->
    <main class="flex-1 flex items-center justify-center px-4 overflow-hidden overscroll-none">
      <div class="text-center max-w-xl mx-auto">
        <!-- Icon  -->
        <div class="mx-auto mb-6 flex items-center justify-center">
          <svg
            class="w-16 h-16 sm:w-20 sm:h-20 text-blue-400"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.94 6.06l-2.12 6.36a1 1 0 01-.62.62l-6.36 2.12a.5.5 0 01-.64-.64l2.12-6.36a1 1 0 01.62-.62l6.36-2.12a.5.5 0 01.64.64zM11 11l-1.62 4.86L14.24 12 11 11z"
            />
          </svg>
        </div>

        <!-- Heading & Description -->
        <h1 class="text-2xl sm:text-3xl font-semibold mb-2">Discover new people</h1>
        <p class="text-neutral-400 text-sm sm:text-base mb-6">
          Start exploring users and find profiles you might like.
        </p>

        <!-- CTA Button -->
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
