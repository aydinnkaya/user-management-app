<template>
  <div class="min-h-screen bg-black text-white">
    <header class="px-4 py-4 flex items-center justify-between max-w-5xl mx-auto">
      <!-- Back Button -->
      <button @click="router.back()" class="flex items-center gap-2 text-gray-300 hover:text-white">
        <BaseIcon name="back_button" size="20" class="text-gray-300" />
        {{ prevTitle }}
      </button>

      <!-- Favorite Button -->
      <button
        v-if="selectedUser"
        @click="toggleFavorite(selectedUser)"
        class="bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:scale-105 transition"
      >
        <BaseIcon
          v-if="isFavorite(selectedUser.id)"
          name="favorite_heart_pink"
          size="24"
          class="text-rose-500"
          aria-hidden="true"
        />
        <BaseIcon v-else name="favorite_heart" size="24" class="text-gray-700" aria-hidden="true" />
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
          <p class="text-sm sm:text-base text-gray-300">
            {{
              selectedUser.age
                ? selectedUser.age + ' ' + $t('profile.yearsOld')
                : $t('profile.ageNotProvided')
            }}
          </p>
          <p class="text-xs sm:text-sm text-gray-400 mt-1">
            {{ selectedUser.email || $t('profile.noEmailProvided') }}
          </p>
          <p class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
            <BaseIcon
              v-if="selectedUser.gender === 'female'"
              name="gender_female"
              size="16"
              class="text-pink-400"
            />
            <BaseIcon v-else name="gender_male" size="16" class="text-blue-400" />
            {{
              selectedUser.gender
                ? capitalizeGender(selectedUser.gender)
                : $t('profile.notSpecified')
            }}
          </p>
          <div class="flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1">
            <span
              >{{ selectedUser.city || $t('profile.unknownCity') }} /
              {{ selectedUser.country || $t('profile.unknownCountry') }}</span
            >
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

      <!-- Action Buttons -->
      <div class="flex justify-center gap-4 px-6 sm:px-8 py-4">
        <button
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition min-w-[120px]"
        >
          {{ $t('profile.actions.follow') }}
        </button>
        <button
          class="flex-1 border border-gray-500 text-gray-200 py-3 rounded-full font-medium hover:bg-gray-800 transition min-w-[120px]"
        >
          {{ $t('profile.actions.message') }}
        </button>
      </div>

      <!-- Gallery -->
      <div class="grid grid-cols-3 gap-1 mt-6">
        <div v-for="n in 9" :key="n" class="overflow-hidden">
          <img
            :src="selectedUser.picture"
            :alt="$t('profile.userPhoto')"
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
import BaseIcon from '@/components/BaseIcon.vue'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const selectedUserStore = useSelectedUserStores()

const selectedUser = computed(() => selectedUserStore.selectedUser)

const flagSrc = computed(() =>
  selectedUser.value ? getFlagUrl(selectedUser.value.country, 20) : getFlagUrl('tr', 20),
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
