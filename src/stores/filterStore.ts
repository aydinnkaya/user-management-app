import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { useFavoritesStore } from './favoritesStore'
import { COUNTRY_LIST } from '@/lib/countries'
import { getFlagCode } from '@/lib/flag'
import type { User, PageFilters, FilterState } from '@/types/User'

const createDefaultFilters = (): FilterState => ({
  countryFilter: [],
  genderFilter: '',
})

export const useFilterStore = defineStore('filterUsers', () => {
  const userStore = useUserStore()
  const favoritesStore = useFavoritesStore()

  const { users: allUsers } = storeToRefs(userStore)
  const { favoriteUsers } = storeToRefs(favoritesStore)

  const pageFilters = ref<PageFilters>({
    home: createDefaultFilters(),
    favorites: createDefaultFilters(),
  })

  const countryCounts = computed<Record<string, number>>(() => {
    const counts: Record<string, number> = {}
    COUNTRY_LIST.forEach((c) => (counts[c.iso2] = 0))

    if (!allUsers.value || allUsers.value.length === 0) {
      return counts
    }

    allUsers.value.forEach((user: User) => {
      const normalizedCountry = getFlagCode(user.country)
      if (normalizedCountry && counts.hasOwnProperty(normalizedCountry)) {
        counts[normalizedCountry]++
      }
    })
    return counts
  })

  /**
   * Generic filter function
   * Filters a given user array by country and gender
   *
   * @param users - Array of users to filter
   * @param filterState - Filter state to apply
   * @returns Filtered users
   */
  const getFilteredUsers = (users: User[], filterState: FilterState): User[] => {
    if (!users || users.length === 0) {
      return []
    }

    const { countryFilter, genderFilter } = filterState

    if ((!countryFilter || countryFilter.length === 0) && !genderFilter) {
      return users
    }

    return users.filter((user: User) => {
      const countryCode = getFlagCode(user.country)
      const matchesCountry =
        !countryFilter ||
        countryFilter.length === 0 ||
        (countryCode && countryFilter.includes(countryCode))
      const matchesGender = !genderFilter || user.gender === genderFilter

      return matchesCountry && matchesGender
    })
  }

  const homeFilteredUsers = computed<User[]>(() =>
    getFilteredUsers(allUsers.value || [], pageFilters.value.home),
  )

  const favoritesFilteredUsers = computed<User[]>(() =>
    getFilteredUsers(favoriteUsers.value || [], pageFilters.value.favorites),
  )

  const updateCountryFilter = (page: keyof PageFilters, countries: string[]): void => {
    pageFilters.value[page].countryFilter = [...countries]
  }

  const updateGenderFilter = (page: keyof PageFilters, gender: string): void => {
    pageFilters.value[page].genderFilter = gender
  }

  const clearFilters = (page: keyof PageFilters): void => {
    pageFilters.value[page] = createDefaultFilters()
  }

  return {
    pageFilters,
    countryCounts,
    homeFilteredUsers,
    favoritesFilteredUsers,
    getFilteredUsers,
    updateCountryFilter,
    updateGenderFilter,
    clearFilters,
  }
})
