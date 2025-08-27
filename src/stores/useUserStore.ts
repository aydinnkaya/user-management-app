// src/stores/userStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/User'
import { useUsers } from '@/composables/useUsers'

// Filter state interface
interface FilterState {
  countryFilter: string[]
  genderFilter: string
}

// Default filter state
const createDefaultFilters = (): FilterState => ({
  countryFilter: [],
  genderFilter: '',
})

export const useUserStore = defineStore('user', () => {
  // Core data state
  const users = ref<User[]>([])
  const selectedUser = ref<User | null>(null)
  const favoriteUsers = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Page-specific filter states
  const homeFilters = ref<FilterState>(createDefaultFilters())
  const favoritesFilters = ref<FilterState>(createDefaultFilters())

  // Global computed properties (unchanged)
  const countries = computed(() => [...new Set(users.value.map((u) => u.country))].sort())
  const genders = computed(() => [...new Set(users.value.map((u) => u.gender))].sort())

  // Helper function to create filtered users based on any filter state
  const createFilteredUsers = (filterState: FilterState, sourceUsers: User[]) => {
    return sourceUsers.filter((u) => {
      const okCountry =
        filterState.countryFilter.length === 0 || filterState.countryFilter.includes(u.country)
      const okGender = !filterState.genderFilter || u.gender === filterState.genderFilter
      return okCountry && okGender
    })
  }

  // Filtered users for home page
  const homeFilteredUsers = computed(() => createFilteredUsers(homeFilters.value, users.value))

  // Filtered favorites for favorites page
  const favoritesFilteredUsers = computed(() =>
    createFilteredUsers(favoritesFilters.value, favoriteUsers.value),
  )

  // Country counts for home page
  const homeCountryCounts = computed(() => {
    const map: Record<string, number> = {}
    for (const u of users.value) {
      map[u.country] = (map[u.country] ?? 0) + 1
    }
    return map
  })

  // Country counts for favorites page
  const favoritesCountryCounts = computed(() => {
    const map: Record<string, number> = {}
    for (const u of favoriteUsers.value) {
      map[u.country] = (map[u.country] ?? 0) + 1
    }
    return map
  })

  // Countries sorted for favorites
  const favoriteCountriesSorted = computed(() =>
    [...new Set(favoriteUsers.value.map((u) => u.country))].sort((a, b) => a.localeCompare(b)),
  )

  // Favorites basic functionality (unchanged)
  const isFavorite = computed(() => {
    return (userId: string) => favoriteUsers.value.some((u) => u.id === userId)
  })

  const favoriteCount = computed(() => favoriteUsers.value.length)

  const getFavoritesByCountry = computed(() =>
    favoriteUsers.value.reduce(
      (acc, u) => {
        ;(acc[u.country] ||= []).push(u)
        return acc
      },
      {} as Record<string, User[]>,
    ),
  )

  const getFavoritesByGender = computed(() =>
    favoriteUsers.value.reduce(
      (acc, u) => {
        ;(acc[u.gender] ||= []).push(u)
        return acc
      },
      {} as Record<string, User[]>,
    ),
  )

  // ACTIONS
  const { fetchUsers: apiFetchUsers } = useUsers()

  // Data fetching (unchanged)
  const fetchUsers = async (count = 100) => {
    if (users.value.length > 0) return
    loading.value = true
    error.value = null
    try {
      users.value = await apiFetchUsers(count)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }

  // Selection (unchanged)
  const setSelectedUser = (user: User) => {
    selectedUser.value = user
  }

  // Favorites management (unchanged)
  const addToFavorites = (user: User) => {
    if (!isFavorite.value(user.id)) {
      favoriteUsers.value.push(user)
      saveFavoritesToStorage()
    }
  }

  const removeFromFavorites = (userId: string) => {
    const idx = favoriteUsers.value.findIndex((u) => u.id === userId)
    if (idx > -1) {
      favoriteUsers.value.splice(idx, 1)
      saveFavoritesToStorage()
    }
  }

  const toggleFavorite = (user: User) =>
    isFavorite.value(user.id) ? removeFromFavorites(user.id) : addToFavorites(user)

  const clearAllFavorites = () => {
    favoriteUsers.value = []
    try {
      localStorage.removeItem('favoriteUsers')
    } catch (e) {
      console.error('Error clearing favorites:', e)
    }
  }

  // Page-specific filter actions
  const setHomeCountryFilter = (countries: string[]) => {
    homeFilters.value.countryFilter = countries
  }

  const setHomeGenderFilter = (gender: string) => {
    homeFilters.value.genderFilter = gender
  }

  const setFavoritesCountryFilter = (countries: string[]) => {
    favoritesFilters.value.countryFilter = countries
  }

  const setFavoritesGenderFilter = (gender: string) => {
    favoritesFilters.value.genderFilter = gender
  }

  const clearHomeFilters = () => {
    homeFilters.value = createDefaultFilters()
  }

  const clearFavoritesFilters = () => {
    favoritesFilters.value = createDefaultFilters()
  }

  // Local storage (unchanged)
  const saveFavoritesToStorage = () => {
    try {
      localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers.value))
    } catch (e) {
      console.error('Error saving favorites:', e)
    }
  }

  const loadFavoritesFromStorage = () => {
    try {
      const stored = localStorage.getItem('favoriteUsers')
      if (!stored) return
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        favoriteUsers.value = parsed.filter(
          (item): item is User =>
            item &&
            typeof item === 'object' &&
            typeof item.id === 'string' &&
            typeof item.name === 'string',
        )
      }
    } catch (e) {
      console.error('Error loading favorites:', e)
    }
  }

  // Initialize
  loadFavoritesFromStorage()

  return {
    // Core state
    users,
    selectedUser,
    favoriteUsers,
    loading,
    error,

    // Page-specific filter states
    homeFilters,
    favoritesFilters,

    // Global computed
    countries,
    genders,

    // Home page specific
    homeFilteredUsers,
    homeCountryCounts,

    // Favorites page specific
    favoritesFilteredUsers,
    favoritesCountryCounts,
    favoriteCountriesSorted,

    // Favorites functionality
    isFavorite,
    favoriteCount,
    getFavoritesByCountry,
    getFavoritesByGender,

    // Actions
    fetchUsers,
    setSelectedUser,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearAllFavorites,

    // Page-specific filter actions
    setHomeCountryFilter,
    setHomeGenderFilter,
    setFavoritesCountryFilter,
    setFavoritesGenderFilter,
    clearHomeFilters,
    clearFavoritesFilters,
  }
})
