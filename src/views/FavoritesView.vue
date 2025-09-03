<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <NavBar />

    <main class="flex-1 flex justify-center overscroll-contain">
      <div class="w-full max-w-screen-2xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        <!-- Filters -->
        <div class="flex items-center justify-end flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            v-if="favoritesFilteredUsers.length > 0"
            @click="openClearModal"
            class="h-7 sm:h-8 md:h-9 px-2 sm:px-3 md:px-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors text-[10px] sm:text-xs md:text-sm font-medium"
          >
            {{ favoritesTexts.clearAll }}
          </button>
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
        </div>

        <!-- No favorites at all -->
        <EmptyState
          v-if="favoriteUsers.length === 0"
          :title="favoritesTexts.noFavorites.title"
          :message="favoritesTexts.noFavorites.message"
          :buttonText="favoritesTexts.noFavorites.buttonText"
          :spriteName="'broken-heart'"
          route="/"
        />

        <!-- No users match filters -->
        <EmptyState
          v-else-if="favoritesFilteredUsers.length === 0"
          :title="favoritesTexts.noFilteredFavorites.title"
          :message="favoritesTexts.noFilteredFavorites.message"
          :buttonText="favoritesTexts.noFilteredFavorites.buttonText"
          :spriteName="'search_find'"
          :onClick="() => filterStore.clearFilters('favorites')"
        />

        <!-- Favorite user list -->
        <div v-else>
          <UserList :users="favoritesFilteredUsers" />
        </div>
      </div>
    </main>
    <!-- Confirm modal -->
    <ConfirmDialog
      :open="showClearModal"
      :title="favoritesTexts.clearAll"
      :message="favoritesTexts.clearConfirm"
      confirmText="Delete all"
      cancelText="Cancel"
      @confirm="confirmClearAll"
      @close="closeClearModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useFilterStore } from '@/stores/filterStore'
import { COUNTRY_LIST } from '@/lib/countries'
import UserList from '@/components/UserList.vue'
import NavBar from '@/components/NavBar.vue'
import CountryPickers from '@/components/CountryPickers.vue'
import GenderFilter from '@/components/genderFilter.vue'
import EmptyState from '@/components/EmptyState.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { favoritesTexts } from '@/strings/appTexts'

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

// modal state
const showClearModal = ref(false)

const openClearModal = () => {
  showClearModal.value = true
}
const closeClearModal = () => {
  showClearModal.value = false
}

const confirmClearAll = () => {
  favoritesStore.clearAllFavorites()
  closeClearModal()
}
</script>
