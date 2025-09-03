<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <!-- Navigation bar -->
    <NavBar />

    <main class="flex-1 flex justify-center">
      <div class="w-full space-y-6">
        <!-- Filters: Gender & Country -->
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
                :counts="currentCounts"
                class="w-16 sm:w-16 md:w-16"
              />
            </div>
          </div>
        </div>

        <!-- User List / Loading / Error States -->
        <div class="max-w-screen-xl mx-auto px-4 pt-6">
          <!-- Loading Indicator -->
          <div v-if="loading" class="flex justify-center items-center py-10">
            <div class="relative">
              <div
                class="animate-spin rounded-full h-10 w-10 border-2 border-neutral-600 border-t-blue-500"
              ></div>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-else-if="error"
            class="rounded-lg border border-red-400 bg-red-500/10 text-red-200 px-4 py-3 flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <BaseIcon name="warning_icon" size="20" class="text-red-500" />
              <span class="text-sm">{{ error }}</span>
            </div>
            <button
              @click="fetchUsers(100)"
              class="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>

          <!-- Main Content -->
          <div v-else>
            <!-- No Users Available -->
            <EmptyState
              v-if="users.length === 0"
              :title="homeTexts.noUsersAvailable.title"
              :message="homeTexts.noUsersAvailable.message"
              :buttonText="homeTexts.noUsersAvailable.buttonText"
              :spriteName="'profile'"
              @click="fetchUsers(100)"
            />

            <!-- No Users Match Filters -->
            <EmptyState
              v-else-if="homeFilteredUsers.length === 0"
              :title="homeTexts.noUsersMatchFilters.title"
              :message="homeTexts.noUsersMatchFilters.message"
              :buttonText="homeTexts.noUsersMatchFilters.buttonText"
              :spriteName="'search_find'"
              :onClick="clearHomeFilters"
            />

            <!-- User List -->
            <div v-else>
              <UserList :users="homeFilteredUsers" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { COUNTRY_LIST } from '@/lib/countries'
import NavBar from '@/components/NavBar.vue'
import UserList from '@/components/UserList.vue'
import GenderFilter from '@/components/genderFilter.vue'
import CountryPickers from '@/components/CountryPickers.vue'
import EmptyState from '@/components/EmptyState.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useUserStore } from '@/stores/userStore'
import { useFilterStore } from '@/stores/filterStore'
import { homeTexts } from '@/strings/appTexts'

const userStore = useUserStore()
const filterStore = useFilterStore()
const { users, loading, error } = storeToRefs(userStore)
const { fetchUsers } = userStore

const homeCountryFilter = computed<string[]>({
  get: () => filterStore.pageFilters.home.countryFilter,
  set: (val: string[]) => filterStore.updateCountryFilter('home', val),
})

const homeGenderFilter = computed<string>({
  get: () => filterStore.pageFilters.home.genderFilter,
  set: (val: string) => filterStore.updateGenderFilter('home', val),
})

const homeFilteredUsers = computed(() => {
  if (!users.value || users.value.length === 0) {
    return []
  }
  return filterStore.homeFilteredUsers
})

const currentCounts = computed(() => filterStore.getCountryCountsForPage('home'))

const clearHomeFilters = () => filterStore.clearFilters('home')

onMounted(async () => {
  await fetchUsers(100)
})
</script>
