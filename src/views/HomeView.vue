<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <NavBar />

    <main class="flex-1 flex justify-center">
      <div class="w-full space-y-6">
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

        <div class="max-w-screen-xl mx-auto px-4 pt-6">
          <div v-if="isInitialLoading" class="flex justify-center items-center py-10">
            <div class="relative">
              <div
                class="animate-spin rounded-full h-10 w-10 border-2 border-neutral-600 border-t-blue-500"
              ></div>
            </div>
          </div>

          <div
            v-else-if="hasCriticalError"
            class="rounded-lg border border-red-400 bg-red-500/10 text-red-200 px-4 py-3 flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.595c.75 1.335-.213 3.006-1.743 3.006H3.482c-1.53 0-2.493-1.671-1.743-3.006L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm">{{ error }}</span>
            </div>
            <button
              @click="initializeData"
              class="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>

          <div v-else>
            <div v-if="users.length === 0 && !isInitialLoading" class="text-center py-12 sm:py-16">
              <div class="mb-5 sm:mb-6">
                <span class="text-5xl sm:text-6xl">👥</span>
              </div>
              <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-2 sm:mb-3">
                No users available
              </h2>
              <p class="text-gray-500 mb-5 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-2">
                We couldn't load any users at this time.
              </p>
              <button
                @click="initializeData"
                class="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
              >
                Start Loading
              </button>
            </div>

            <div
              v-else-if="homeFilteredUsers.length === 0 && users.length > 0"
              class="text-center py-12 sm:py-16"
            >
              <div class="mb-5 sm:mb-6">
                <span class="text-5xl sm:text-6xl">🔍</span>
              </div>
              <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-2 sm:mb-3">
                No users match your filters
              </h2>
              <p class="text-gray-500 mb-5 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-2">
                Try adjusting your filters to see more users.
              </p>
              <button
                @click="clearHomeFilters"
                class="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
              >
                Clear Filters
              </button>
            </div>

            <div v-else>
              <div class="space-y-6">
                <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 md:gap-3">
                  <UserCard
                    v-for="user in homeFilteredUsers"
                    :key="user.id"
                    :user="user"
                    :is-loading="false"
                    :show-debug-info="false"
                  />
                </div>

                <div v-if="pagination.hasMore" class="flex flex-col items-center py-6 space-y-4">
                  <div
                    ref="sentinelRef"
                    class="w-full h-4 flex items-center justify-center"
                    :class="{ 'opacity-50': !pagination.hasMore }"
                  >
                    <div
                      v-if="pagination.isLoading && pagination.hasMore"
                      class="flex items-center gap-3 text-gray-400"
                    >
                      <div
                        class="animate-spin rounded-full h-6 w-6 border-2 border-neutral-600 border-t-blue-500"
                      ></div>
                      <span class="text-sm font-medium">Loading more users...</span>
                    </div>

                    <div
                      v-else-if="!pagination.hasMore && !pagination.isLoading"
                      class="flex items-center gap-2 text-gray-500"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="text-sm">You've reached the end!</span>
                    </div>

                    <div
                      v-else-if="error && !pagination.isLoading"
                      class="flex items-center gap-3 text-red-400"
                    >
                      <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="text-sm">Failed to load more</span>
                      <button
                        @click="() => loadNextPage(TOTAL_USERS)"
                        class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, computed, ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar.vue'
import UserCard from '@/components/userCard.vue'
import GenderFilter from '@/components/genderFilter.vue'
import CountryPickers from '@/components/CountryPickers.vue'
import { useUserStore } from '@/stores/userStore'
import { useFilterStore } from '@/stores/filterStore'
import { COUNTRY_LIST } from '@/lib/countries'

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

const homeFilteredUsers = computed(() => {
  if (!users.value || users.value.length === 0) return []
  return filterStore.getFilteredUsers(users.value, filterStore.pageFilters.home)
})

const homeCountryCounts = computed(() => filterStore.countryCounts)

const isInitialLoading = computed(
  () => loading.value || (pagination.value.isInitialLoad && pagination.value.isLoading),
)

const hasCriticalError = computed(() => error.value && users.value.length === 0)

const clearHomeFilters = () => filterStore.clearFilters('home')

const initializeData = async () => {
  await initializeInfiniteScroll(PAGE_SIZE, TOTAL_USERS)
}

const setupIntersectionObserver = () => {
  if (!window.IntersectionObserver || !sentinelRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && pagination.value.hasMore && !pagination.value.isLoading) {
          loadNextPage(TOTAL_USERS)
        }
      })
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    },
  )

  observer.observe(sentinelRef.value)
}

const cleanupObserver = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

watch(sentinelRef, (newElement) => {
  cleanupObserver()
  if (newElement) {
    nextTick(() => {
      setupIntersectionObserver()
    })
  }
})

watch(
  [homeCountryFilter, homeGenderFilter],
  async () => {
    if (users.value.length > 0) {
      cleanupObserver()
      resetInfiniteScroll()
      await initializeInfiniteScroll(PAGE_SIZE, TOTAL_USERS)
      nextTick(() => {
        setupIntersectionObserver()
      })
    }
  },
  { deep: true },
)

onMounted(() => {
  initializeData().then(() => {
    nextTick(() => {
      setupIntersectionObserver()
    })
  })
})

onUnmounted(() => {
  cleanupObserver()
})
</script>
