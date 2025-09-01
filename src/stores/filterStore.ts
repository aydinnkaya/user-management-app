import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { useFavoritesStore } from './favoritesStore'
import { COUNTRY_LIST } from '@/lib/countries'
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

  const getCountryCounts = (users: User[]): Record<string, number> => {
    const counts: Record<string, number> = {}
    COUNTRY_LIST.forEach((country) => (counts[country.iso2] = 0))

    if (!users?.length) {
      return counts
    }

    users.forEach((user: User) => {
      const country = COUNTRY_LIST.find((c) => c.name.toLowerCase() === user.country.toLowerCase())

      if (country && counts[country.iso2] !== undefined) {
        counts[country.iso2]++
      }
    })

    return counts
  }

  const getCountryCountsForPage = (page: keyof PageFilters): Record<string, number> => {
    return page === 'home'
      ? getCountryCounts(allUsers.value || [])
      : getCountryCounts(favoriteUsers.value || [])
  }

  const countryCounts = computed<Record<string, number>>(() => getCountryCountsForPage('home'))

  const favoriteCountryCounts = computed<Record<string, number>>(() =>
    getCountryCountsForPage('favorites'),
  )

  const getFilteredUsers = (users: User[], filterState: FilterState): User[] => {
    if (!users?.length) {
      return []
    }

    const { countryFilter, genderFilter } = filterState

    if (!countryFilter?.length && !genderFilter) {
      return users
    }

    return users.filter((user: User) => {
      const country = COUNTRY_LIST.find((c) => c.name.toLowerCase() === user.country.toLowerCase())

      const matchesCountry =
        !countryFilter?.length || (country && countryFilter.includes(country.iso2))

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

  const getFilterState = (page: keyof PageFilters): FilterState => {
    return pageFilters.value[page]
  }

  const hasActiveFilters = (page: keyof PageFilters): boolean => {
    const filters = pageFilters.value[page]
    return filters.countryFilter?.length > 0 || !!filters.genderFilter
  }

  return {
    pageFilters,
    countryCounts,
    favoriteCountryCounts,
    homeFilteredUsers,
    favoritesFilteredUsers,
    getFilteredUsers,
    getCountryCountsForPage,
    updateCountryFilter,
    updateGenderFilter,
    clearFilters,
    getFilterState,
    hasActiveFilters,
  }
})
