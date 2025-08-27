<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <NavBar />

    <main class="flex-1 flex justify-center">
      <div class="w-full max-w-screen-2xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        <div class="flex items-center justify-end flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
          <GenderFilter
            :model-value="favoritesFilters.genderFilter"
            @update:model-value="setFavoritesGenderFilter"
          />

          <div class="w-auto">
            <CountryPicker
              :model-value="favoritesFilters.countryFilter"
              @update:model-value="setFavoritesCountryFilter"
              :options="favoriteCountriesSorted"
              :counts="favoritesCountryCounts"
              class="w-auto"
            />
          </div>

          <button
            v-if="favoritesFilteredUsers.length > 0"
            @click="handleClearAllFavorites"
            class="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors text-xs sm:text-sm font-medium"
          >
            Clear All Favorites
          </button>
        </div>

        <div v-if="favoriteUsers.length === 0" class="text-center py-12 sm:py-16">
          <div class="mb-5 sm:mb-6">
            <span class="text-5xl sm:text-6xl">💔</span>
          </div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-2 sm:mb-3">
            No favorite users found
          </h2>
          <p class="text-gray-500 mb-5 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-2">
            You haven't added any users to your favorites yet.
          </p>
          <router-link
            to="/"
            class="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
          >
            Explore Users
          </router-link>
        </div>

        <div v-else-if="favoritesFilteredUsers.length === 0" class="text-center py-12 sm:py-16">
          <div class="mb-5 sm:mb-6">
            <span class="text-5xl sm:text-6xl">🔍</span>
          </div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-2 sm:mb-3">
            No users match your filters
          </h2>
          <p class="text-gray-500 mb-5 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-2">
            Try adjusting your filters to see your favorite users.
          </p>
          <button
            @click="clearFavoritesFilters"
            class="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
          >
            Clear Filters
          </button>
        </div>

        <div v-else>
          <UserList
            :users="favoritesFilteredUsers"
            :loading="false"
            :error="null"
            grid-class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3"
            empty-message="No favorite users found"
            empty-sub-message="Try adjusting your filters or explore users to add favorites."
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'

import UserList from '@/components/UserList.vue'
import NavBar from '@/components/NavBar.vue'
import CountryPicker from '@/components/CountryPicker.vue'
import GenderFilter from '@/components/genderFilter.vue'

const store = useUserStore()
const {
  favoritesFilters,
  favoritesFilteredUsers,
  favoritesCountryCounts,
  favoriteCountriesSorted,
  favoriteUsers,
} = storeToRefs(store)

const {
  clearAllFavorites,
  setFavoritesCountryFilter,
  setFavoritesGenderFilter,
  clearFavoritesFilters,
} = store

function handleClearAllFavorites() {
  if (confirm('Are you sure you want to clear all favorites?')) {
    clearAllFavorites()
  }
}
</script>
