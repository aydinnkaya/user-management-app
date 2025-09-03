<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <NavBar />

    <main class="flex-1 flex justify-center">
      <div class="w-full space-y-6">
        <!-- Filters -->
        <div class="h-10 pt-8">
          <div class="max-w-screen-xl mx-auto px-4">
            <div class="flex justify-end items-center gap-2 sm:gap-2 md:gap-3">
              <GenderFilter
                :model-value="homeGenderFilter"
                @update:model-value="(val) => (homeGenderFilter = val)"
              />
              <CountryPickers
                :model-value="homeCountryFilter"
                @update:model-value="(val) => (homeCountryFilter = val)"
                :options="COUNTRY_LIST"
                :counts="homeCountryCounts"
                class="w-16 sm:w-16 md:w-16"
              />
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="max-w-screen-xl mx-auto px-4 pt-6">
          <!-- Initial loading -->
          <div v-if="isInitialLoading" class="flex justify-center items-center py-10">
            <div
              class="animate-spin rounded-full h-10 w-10 border-2 border-neutral-600 border-t-blue-500"
            />
          </div>

          <!-- Error State -->
          <div
            v-else-if="hasCriticalError"
            class="rounded-lg border border-red-400 bg-red-500/10 text-red-200 px-4 py-3 flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <BaseIcon name="warning_icon" size="20" class="text-red-500" />
              <span class="text-sm">{{ error }}</span>
            </div>
            <button
              @click="initializeData"
              class="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>

          <!-- Main Content -->
          <div v-else>
            <EmptyState
              v-if="users.length === 0"
              :title="homeTexts.noUsersAvailable.title"
              :message="homeTexts.noUsersAvailable.message"
              :buttonText="homeTexts.noUsersAvailable.buttonText"
              :spriteName="'profile'"
              @click="initializeData"
            />

            <EmptyState
              v-else-if="homeFilteredUsers.length === 0"
              :title="homeTexts.noUsersMatchFilters.title"
              :message="homeTexts.noUsersMatchFilters.message"
              :buttonText="homeTexts.noUsersMatchFilters.buttonText"
              :spriteName="'search_find'"
              :onClick="clearHomeFilters"
            />

            <!-- User List with Infinite Scroll -->
            <div v-else>
              <UserList :users="homeFilteredUsers" />

              <!-- Sentinel for Infinite Scroll -->
              <div ref="sentinelRef" class="flex justify-center py-6">
                <div
                  v-if="pagination.isLoading && pagination.hasMore"
                  class="flex gap-3 items-center"
                >
                  <div
                    class="animate-spin rounded-full h-6 w-6 border-2 border-neutral-600 border-t-blue-500"
                  ></div>
                  <span class="text-sm text-gray-400">Loading more...</span>
                </div>

                <div
                  v-else-if="error && !pagination.isLoading"
                  class="flex items-center gap-3 text-red-400"
                >
                  <BaseIcon name="warning_icon" size="20" class="text-red-400" />
                  <span class="text-sm">Failed to load more</span>
                  <button
                    @click="() => loadNextPage(TOTAL_USERS)"
                    class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                  >
                    Retry
                  </button>
                </div>

                <span v-else-if="!pagination.hasMore" class="text-xs text-gray-500"
                  >You've reached the end!</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar.vue'
import UserList from '@/components/UserList.vue'
import GenderFilter from '@/components/genderFilter.vue'
import CountryPickers from '@/components/CountryPickers.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useUserStore } from '@/stores/userStore'
import { useFilterStore } from '@/stores/filterStore'
import { COUNTRY_LIST } from '@/lib/countries'
import { homeTexts } from '@/strings/appTexts'

const TOTAL_USERS = 100
const PAGE_SIZE = 20

const userStore = useUserStore()
const filterStore = useFilterStore()
const { users, loading, error, pagination } = storeToRefs(userStore)
const { initializeInfiniteScroll, loadNextPage, resetInfiniteScroll } = userStore

const sentinelRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const homeCountryFilter = computed<string[]>({
  get: () => filterStore.pageFilters.home.countryFilter,
  set: (val: string[]) => filterStore.updateCountryFilter('home', val),
})

const homeGenderFilter = computed<string>({
  get: () => filterStore.pageFilters.home.genderFilter,
  set: (val: string) => filterStore.updateGenderFilter('home', val),
})

const homeFilteredUsers = computed(() =>
  users.value.length === 0
    ? []
    : filterStore.getFilteredUsers(users.value, filterStore.pageFilters.home),
)

const homeCountryCounts = computed(() => filterStore.getCountryCountsForPage('home'))

const isInitialLoading = computed(
  () => loading.value || (pagination.value.isInitialLoad && pagination.value.isLoading),
)

const hasCriticalError = computed(() => !!error.value && users.value.length === 0)

const clearHomeFilters = () => filterStore.clearFilters('home')

const initializeData = async () => {
  await initializeInfiniteScroll(PAGE_SIZE, TOTAL_USERS)
}

const setupIntersectionObserver = () => {
  if (!sentinelRef.value) return
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && pagination.value.hasMore && !pagination.value.isLoading) {
        loadNextPage(TOTAL_USERS)
      }
    })
  })
  observer.observe(sentinelRef.value)
}

const cleanupObserver = () => {
  if (observer) observer.disconnect()
}

watch(sentinelRef, () => {
  cleanupObserver()
  nextTick(setupIntersectionObserver)
})

watch([homeCountryFilter, homeGenderFilter], async () => {
  cleanupObserver()
  resetInfiniteScroll()
  await initializeInfiniteScroll(PAGE_SIZE, TOTAL_USERS)
  nextTick(setupIntersectionObserver)
})

onMounted(async () => {
  await initializeData()
  nextTick(setupIntersectionObserver)
})

onUnmounted(cleanupObserver)
</script>
