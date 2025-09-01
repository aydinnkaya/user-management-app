<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <NavBar />

    <main class="flex-1 flex justify-center">
      <div class="w-full max-w-screen-2xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        <!-- Filters -->
        <div class="flex items-center justify-end flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
          <GenderFilter
            :model-value="favoritesGenderFilter"
            @update:model-value="(val) => (favoritesGenderFilter = val)"
          />

          <div class="w-auto">
            <CountryPickers
              :model-value="favoritesCountryFilter"
              @update:model-value="(val) => (favoritesCountryFilter = val)"
              :options="COUNTRY_LIST"
              :counts="currentCounts"
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

        <!-- No favorites at all -->
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

        <!-- No users match filters -->
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
            @click="filterStore.clearFilters('favorites')"
            class="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
          >
            Clear Filters
          </button>
        </div>

        <!-- Favorite user list -->
        <div v-else>
          <UserList :users="favoritesFilteredUsers" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useFilterStore } from '@/stores/filterStore'
import { COUNTRY_LIST } from '@/lib/countries'
import UserList from '@/components/UserList.vue'
import NavBar from '@/components/NavBar.vue'
import CountryPickers from '@/components/CountryPickers.vue'
import GenderFilter from '@/components/genderFilter.vue'

const favoritesStore = useFavoritesStore()
const filterStore = useFilterStore()

const { favoriteUsers } = storeToRefs(favoritesStore)
const { favoritesFilteredUsers } = storeToRefs(filterStore)
const currentCounts = computed(() => filterStore.getCountryCountsForPage('favorites'))

const favoritesCountryFilter = computed<string[]>({
  get: () => filterStore.pageFilters.favorites.countryFilter,
  set: (val: string[]) => filterStore.updateCountryFilter('favorites', val),
})

const favoritesGenderFilter = computed<string>({
  get: () => filterStore.pageFilters.favorites.genderFilter,
  set: (val: string) => filterStore.updateGenderFilter('favorites', val),
})

const handleClearAllFavorites = () => {
  if (confirm('Are you sure you want to clear all favorites?')) {
    favoritesStore.clearAllFavorites()
  }
}
</script>
