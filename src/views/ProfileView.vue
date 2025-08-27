<template>
  <div class="min-h-screen bg-black text-white">
    <NavBar />

    <main v-if="user" class="max-w-5xl mx-auto px-4 py-6">
      <div>
        <div class="px-6 sm:px-8 py-6 flex flex-row items-center gap-6">
          <img
            :src="user.picture"
            :alt="`${user.name} profile picture`"
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0 select-none pointer-events-none"
          />
          <div class="text-left flex-1">
            <h1 class="text-xl sm:text-2xl font-bold">{{ user.name }}</h1>
            <p class="text-sm sm:text-base text-gray-300">
              {{ user.age ? user.age + ' years old' : 'Age not provided' }}
            </p>
            <p class="text-xs sm:text-sm text-gray-400 mt-1">
              {{ user.email || 'No email provided' }}
            </p>
            <p class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
              <svg
                v-if="user.gender === 'female'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-pink-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a7 7 0 0 0-1 13.9V17H9v2h2v2h2v-2h2v-2h-2v-1.1A7 7 0 0 0 12 2z" />
              </svg>
              <svg
                v-else-if="user.gender === 'male'"
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
              {{ user.gender ? capitalizeGender(user.gender) : 'Not specified' }}
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
                >{{ user.city || 'Unknown City' }} / {{ user.country || 'Unknown Country' }}</span
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
      </div>

      <div class="grid grid-cols-3 gap-1 mt-6">
        <div v-for="n in 9" :key="n" class="overflow-hidden">
          <img :src="user.picture" alt="User photo" class="w-full aspect-square object-cover" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar.vue'
import { useUserStore } from '@/stores/useUserStore'
import type { User } from '@/types/User'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)

const user = computed<User | null>(() => users.value[0] ?? null)

onMounted(() => {
  userStore.fetchUsers(100)
  window.scrollTo({ top: 0, behavior: 'instant' })
})

const capitalizeGender = (g: string) => g.charAt(0).toUpperCase() + g.slice(1)
</script>
