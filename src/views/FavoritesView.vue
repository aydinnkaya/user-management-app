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
            {{ $t('favorites.clearAll') }}
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

        <!-- Empty states & list -->
        <EmptyState
          v-if="favoriteUsers.length === 0"
          :title="$t('favorites.noFavorites.title')"
          :message="$t('favorites.noFavorites.message')"
          :buttonText="$t('favorites.noFavorites.buttonText')"
          :spriteName="'broken-heart'"
          route="/"
        />

        <EmptyState
          v-else-if="favoritesFilteredUsers.length === 0"
          :title="$t('favorites.noFilteredFavorites.title')"
          :message="$t('favorites.noFilteredFavorites.message')"
          :buttonText="$t('favorites.noFilteredFavorites.buttonText')"
          :spriteName="'search_find'"
          :onClick="() => filterStore.clearFilters('favorites')"
        />

        <div v-else>
          <div class="flex-1 overflow-y-auto overflow-x-hidden">
            <div
              class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 px-1 sm:px-2 pb-20 md:pb-8"
            >
              <div v-for="user in favoritesFilteredUsers" :key="user.id">
                <UserCard :user="user" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Confirm modal -->
    <ConfirmDialog
      :open="showClearModal"
      :title="$t('favorites.clearAll')"
      :message="$t('favorites.clearConfirm')"
      :confirmText="$t('common.confirm')"
      :cancelText="$t('common.cancel')"
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
import UserCard from '@/components/UserCard.vue'
import NavBar from '@/components/NavBar.vue'
import CountryPickers from '@/components/CountryPickers.vue'
import GenderFilter from '@/components/genderFilter.vue'
import EmptyState from '@/components/EmptyState.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import type { Gender } from '@/models/User'

const favoritesStore = useFavoritesStore()
const filterStore = useFilterStore()

const { favoriteUsers } = storeToRefs(favoritesStore)
const { favoritesFilteredUsers } = storeToRefs(filterStore)

const currentCounts = computed(() => filterStore.getCountryCountsForPage('favorites'))

const favoritesCountryFilter = computed<string[]>({
  get: () => filterStore.pageFilters.favorites.countryFilter,
  set: (val: string[]) => filterStore.updateCountryFilter('favorites', val),
})

const favoritesGenderFilter = computed<Gender | ''>({
  get: () => filterStore.pageFilters.favorites.genderFilter,
  set: (val: Gender | '') => filterStore.updateGenderFilter('favorites', val),
})

// modal state
const showClearModal = ref(false)
const openClearModal = () => (showClearModal.value = true)
const closeClearModal = () => (showClearModal.value = false)

const confirmClearAll = () => {
  favoritesStore.clearAllFavorites()
  closeClearModal()
}
</script>
