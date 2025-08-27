<template>
  <div class="min-h-screen bg-black text-white">
    <header class="px-4 py-4 flex items-center justify-between max-w-5xl mx-auto">
      <button
        @click="router.back()"
        class="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {{ prevTitle }}
      </button>

      <button
        @click="toggleFavorite"
        class="bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:scale-105 transition"
      >
        <svg
          v-if="isFavorite"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          class="w-6 h-6 text-rose-600"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09
               4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0
               3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          class="w-6 h-6 text-gray-700"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12
               20.364l7.682-7.682a4.5 4.5 0
               00-6.364-6.364L12 7.636
               10.682 6.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </header>

    <main v-if="selectedUser" class="max-w-5xl mx-auto px-4 py-6">
      <div>
        <div class="px-6 sm:px-8 py-6 flex flex-row items-center gap-6">
          <img
            :src="selectedUser.picture"
            :alt="`${selectedUser.name} profile picture`"
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0 select-none pointer-events-none"
          />
          <div class="text-left flex-1">
            <h1 class="text-xl sm:text-2xl font-bold">{{ selectedUser.name }}</h1>
            <p class="text-sm sm:text-base text-gray-300">
              {{ selectedUser.age ? selectedUser.age + ' years old' : 'Age not provided' }}
            </p>
            <p class="text-xs sm:text-sm text-gray-400 mt-1">
              {{ selectedUser.email || 'No email provided' }}
            </p>
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
                v-else-if="selectedUser.gender === 'male'"
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
              {{ selectedUser.gender ? capitalizeGender(selectedUser.gender) : 'Not specified' }}
            </p>
            <div class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
              <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C8.134 2 5 5.134 5 9c0
                     5.25 7 13 7 13s7-7.75
                     7-13c0-3.866-3.134-7-7-7zm0
                     9.5A2.5 2.5 0 1 1 12 6a2.5
                     2.5 0 0 1 0 5.5z"
                />
              </svg>
              <span
                >{{ selectedUser.city || 'Unknown City' }} /
                {{ selectedUser.country || 'Unknown Country' }}</span
              >
            </div>
          </div>
        </div>

        <section class="grid grid-cols-4 text-center py-4">
          <div>
            <p class="font-bold text-lg">0</p>
            <p class="text-xs text-gray-400">Followers</p>
          </div>
          <div>
            <p class="font-bold text-lg">0</p>
            <p class="text-xs text-gray-400">Following</p>
          </div>
          <div>
            <p class="font-bold text-lg">0</p>
            <p class="text-xs text-gray-400">Received</p>
          </div>
          <div>
            <p class="font-bold text-lg">0</p>
            <p class="text-xs text-gray-400">Sent</p>
          </div>
        </section>

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
      </div>

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
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()
const userStore = useUserStore()
const selectedUser = computed(() => userStore.selectedUser)
const prevTitle = history.state?.backTitle || 'Back'

const isFavorite = computed(() =>
  selectedUser.value ? userStore.isFavorite(selectedUser.value.id) : false,
)

const toggleFavorite = () => {
  if (selectedUser.value) {
    userStore.toggleFavorite(selectedUser.value)
  }
}

const capitalizeGender = (gender: string): string => {
  return gender.charAt(0).toUpperCase() + gender.slice(1)
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>
