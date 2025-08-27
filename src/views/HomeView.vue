<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <NavBar />

    <main class="flex-1 flex justify-center">
      <div class="w-full space-y-6">
        <div class="h-10 pt-8">
          <div class="max-w-screen-xl mx-auto px-4">
            <div class="flex justify-end items-center gap-2 sm:gap-2 md:gap-3">
              <GenderFilter
                :model-value="homeFilters.genderFilter"
                @update:model-value="setHomeGenderFilter"
              />

              <CountryPicker
                :model-value="homeFilters.countryFilter"
                @update:model-value="setHomeCountryFilter"
                :options="countries"
                :counts="homeCountryCounts"
                class="w-16 sm:w-16 md:w-16"
              />
            </div>
          </div>
        </div>

        <div class="max-w-screen-xl mx-auto px-4 pt-6">
          <div v-if="loading" class="flex justify-center items-center py-10">
            <div class="relative">
              <div
                class="animate-spin rounded-full h-10 w-10 border-2 border-neutral-600 border-t-blue-500"
              ></div>
            </div>
          </div>

          <div
            v-else-if="error"
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
              @click="fetchUsers(100)"
              class="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>

          <!-- No Users at All -->
          <div v-else-if="users.length === 0" class="text-center py-12 sm:py-16">
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
              @click="fetchUsers(100)"
              class="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
            >
              Reload Users
            </button>
          </div>

          <div v-else-if="homeFilteredUsers.length === 0" class="text-center py-12 sm:py-16">
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
            <UserList
              :users="homeFilteredUsers"
              :loading="false"
              :error="null"
              grid-class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 md:gap-3"
              empty-message="No users found."
              empty-sub-message="Try adjusting your filters."
              :show-loading="false"
              :show-error="false"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar.vue'
import UserList from '@/components/UserList.vue'
import GenderFilter from '@/components/genderFilter.vue'
import CountryPicker from '@/components/CountryPicker.vue'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
const { homeFilters, homeFilteredUsers, homeCountryCounts, countries, users, loading, error } =
  storeToRefs(userStore)

const { fetchUsers, setHomeCountryFilter, setHomeGenderFilter, clearHomeFilters } = userStore

onMounted(() => {
  fetchUsers(100)
})
</script>
