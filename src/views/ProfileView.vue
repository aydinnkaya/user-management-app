<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Navigation bar -->
    <NavBar />

    <!-- User Profile Main Section -->
    <main v-if="user" class="max-w-5xl mx-auto px-4 py-6">
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
            {{ user.age ? user.age + ' ' + $t('profile.yearsOld') : $t('profile.ageNotProvided') }}
          </p>
          <p class="text-xs sm:text-sm text-gray-400 mt-1">
            {{ user.email || $t('profile.noEmailProvided') }}
          </p>
          <p class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
            <!-- Gender Icon -->
            <BaseIcon
              v-if="user.gender === 'female'"
              name="gender_female"
              size="16"
              class="text-pink-400"
            />
            <BaseIcon v-else name="gender_male" size="16" class="text-blue-400" />
            {{ user.gender ? capitalizeGender(user.gender) : $t('profile.notSpecified') }}
          </p>
          <div class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
            <span
              >{{ user.city || $t('profile.unknownCity') }} /
              {{ user.country || $t('profile.unknownCountry') }}</span
            >
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
          <p class="text-xs text-gray-400">{{ $t('profile.stats.followers') }}</p>
        </div>
        <div>
          <p class="font-bold text-lg">0</p>
          <p class="text-xs text-gray-400">{{ $t('profile.stats.following') }}</p>
        </div>
        <div>
          <p class="font-bold text-lg">0</p>
          <p class="text-xs text-gray-400">{{ $t('profile.stats.received') }}</p>
        </div>
        <div>
          <p class="font-bold text-lg">0</p>
          <p class="text-xs text-gray-400">{{ $t('profile.stats.sent') }}</p>
        </div>
      </section>

      <!-- User Photos Grid -->
      <div class="grid grid-cols-3 gap-1 mt-6">
        <div v-for="n in 9" :key="n" class="overflow-hidden">
          <img
            :src="user.picture"
            :alt="$t('profile.userPhoto')"
            class="w-full aspect-square object-cover"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/models/User'
import { getFlagUrl } from '@/lib/flags'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const { initializeInfiniteScroll } = userStore

const user = computed<User | null>(() => users.value[0] ?? null)

const flagSrc = computed(() => (user.value ? getFlagUrl(user.value.country, 20) : ''))

const handleInitialLoad = async () => {
  await initializeInfiniteScroll()
}

onMounted(async () => {
  if (users.value.length === 0) {
    await handleInitialLoad()
  }
})
const capitalizeGender = (g: string) => g.charAt(0).toUpperCase() + g.slice(1)
</script>
