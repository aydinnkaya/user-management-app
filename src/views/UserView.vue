<template>
  <div class="min-h-screen bg-black text-white">
    <header class="px-4 py-4 flex items-center justify-between max-w-5xl mx-auto">
      <!-- Back Button -->
      <button @click="router.back()" class="flex items-center gap-2 text-gray-300 hover:text-white">
        <img src="/logo/back_button.svg" alt="Back" class="w-5 h-5" />
        {{ prevTitle }}
      </button>

      <!-- Favorite Button -->
      <button
        v-if="selectedUser"
        @click="toggleFavorite(selectedUser)"
        class="bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:scale-105 transition"
      >
        <img
          v-if="isFavorite(selectedUser.id)"
          src="/logo/favorite_heart_pink.svg"
          alt="Favorite"
          class="w-6 h-6 text-gray-700"
          aria-hidden="true"
        />
        <img
          v-else
          src="/logo/favorite_heart.svg"
          alt="Not Favorite"
          class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
          aria-hidden="true"
        />
      </button>
    </header>

    <!-- Main Content -->
    <main v-if="selectedUser" class="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <!-- User Info Section -->
      <div class="px-6 sm:px-8 py-6 flex flex-row items-center gap-6">
        <img
          :src="selectedUser.picture"
          :alt="`${selectedUser.name} profile picture`"
          class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0 select-none pointer-events-none"
        />
        <div class="text-left flex-1">
          <h1 class="text-xl sm:text-2xl font-bold">{{ selectedUser.name }}</h1>
          <p class="text-sm sm:text-base text-gray-300">{{ selectedUser.age }} years old</p>
          <p class="text-xs sm:text-sm text-gray-400 mt-1">{{ selectedUser.email }}</p>
          <p class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
            <svg
              v-if="selectedUser.gender === 'female'"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-pink-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a7 7 0 0 0-1 13.9V17H9v2h2v2h2v-2h2v-2h-2v-1.1A7 7 0 0 0 12 2z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 3h-6v2h3.59l-4.13 4.13A6.5
                   6.5 0 1 0 14.5 12a6.48
                   6.48 0 0 0-1.27-3.86L17.5
                   4.91V8.5H19V3z"
              />
            </svg>
            {{ capitalizeGender(selectedUser.gender) }}
          </p>
          <div class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
            <span>{{ selectedUser.city }} / {{ selectedUser.country }}</span>
            <img
              v-if="flagSrc"
              :src="flagSrc"
              :alt="`${selectedUser.country} flag`"
              class="w-5 h-3 rounded-sm object-cover flex-shrink-0"
              loading="lazy"
              referrerpolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <section class="grid grid-cols-4 text-center py-4">
        <div v-for="(label, idx) in ['Followers', 'Following', 'Received', 'Sent']" :key="idx">
          <p class="font-bold text-lg">0</p>
          <p class="text-xs text-gray-400">{{ label }}</p>
        </div>
      </section>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-4 px-6 sm:px-8 py-4">
        <button
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition min-w-[120px]"
        >
          Follow
        </button>
        <button
          class="flex-1 border border-gray-500 text-gray-200 py-3 rounded-full font-medium hover:bg-gray-800 transition min-w-[120px]"
        >
          Message
        </button>
      </div>

      <!-- Gallery -->
      <div class="grid grid-cols-3 gap-1 mt-6">
        <div v-for="n in 9" :key="n" class="overflow-hidden">
          <img
            :src="selectedUser.picture"
            alt="User photo"
            class="w-full aspect-square object-cover"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useSelectedUserStores } from '@/stores/selectedUserStore'
import type { User } from '@/types/User'
import { getFlagUrl } from '@/lib/flags'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const selectedUserStore = useSelectedUserStores()

const selectedUser = computed(() => selectedUserStore.selectedUser)

const flagSrc = computed(() =>
  selectedUser.value ? getFlagUrl(selectedUser.value.country, 20) : '',
)

const prevTitle = history.state?.backTitle || 'Back'

const isFavorite = (userId: string) => favoritesStore.isFavorite(userId)

const toggleFavorite = (user: User) => {
  favoritesStore.toggleFavorite(user)
}

const capitalizeGender = (gender: string) => gender.charAt(0).toUpperCase() + gender.slice(1)

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>
