<template>
  <div class="min-h-screen bg-black text-white overscroll-none">
    <!-- Navigation bar -->
    <NavBar />

    <!-- User Profile Main Section -->
    <main v-if="user" class="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <!-- Profile Header -->
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
            <!-- Gender Icon -->
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
                d="M19 3h-6v2h3.59l-4.13 4.13A6.5 6.5 0 1 0 14.5 12a6.48 6.48 0 0 0-1.27-3.86L17.5 4.91V8.5H19V3z"
              />
            </svg>
            {{ user.gender ? capitalizeGender(user.gender) : 'Not specified' }}
          </p>
          <div class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
            <span>{{ user.city }} / {{ user.country }}</span>
            <img
              v-if="flagSrc"
              :src="flagSrc"
              :alt="`${user.country} flag`"
              class="w-5 h-3 rounded-sm object-cover flex-shrink-0"
              loading="lazy"
              referrerpolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      <!-- User Stats Section -->
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

      <!-- User Photos Grid -->
      <div class="grid grid-cols-3 gap-1 mt-6">
        <div v-for="n in 9" :key="n" class="overflow-hidden">
          <img :src="user.picture" alt="User photo" class="w-full aspect-square object-cover" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar.vue'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/types/User'
import { getFlagUrl } from '@/lib/flags'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)

const user = computed<User | null>(() => users.value[0] ?? null)
const flagSrc = computed(() => (user.value ? getFlagUrl(user.value.country, 20) : ''))

onMounted(async () => {
  await nextTick()
  const scrollContainer = document.getElementById('scroll-container')
  if (scrollContainer) {
    scrollContainer.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }
})

const capitalizeGender = (g: string) => g.charAt(0).toUpperCase() + g.slice(1)
</script>
