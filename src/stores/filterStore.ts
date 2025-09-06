import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { useFavoritesStore } from './favoritesStore'
import { COUNTRY_LIST } from '@/lib/countries'
import type { User, PageFilters, FilterState, Gender } from '@/models/User'

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

    if (!users?.length) return counts

    // TODO: Optimize with Map lookup for large datasets (O(n*m) -> O(n))
    users.forEach((user: User) => {
      // TODO: Optimize country lookup when user count > 1000
      const country = COUNTRY_LIST.find((c) => c.name.toLowerCase() === user.country.toLowerCase())
      if (country && counts[country.iso2] !== undefined) {
        counts[country.iso2]++
      }
    })

    return counts
  }

  const getCountryCountsForPage = (page: keyof PageFilters): Record<string, number> => {
    const users =
      page === 'home' ? homeFilteredUsers.value || [] : favoritesFilteredUsers.value || []
    return getCountryCounts(users)
  }
  const getFilteredUsers = (users: User[], filterState: FilterState): User[] => {
    if (!users?.length) return []

    const { countryFilter, genderFilter } = filterState
    if (!countryFilter?.length && !genderFilter) return users

    return users.filter((user: User) => {
      const country = COUNTRY_LIST.find((c) => c.name.toLowerCase() === user.country.toLowerCase())

      const matchesCountry =
        !countryFilter?.length || (country && countryFilter.includes(country.iso2))

      // genderFilter: '' | 'male' | 'female'
      const matchesGender = genderFilter === '' || user.gender === genderFilter

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
    // Use spread to create a new array reference
    pageFilters.value[page].countryFilter = [...countries]
  }

  const updateGenderFilter = (page: keyof PageFilters, gender: Gender | ''): void => {
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
    return (filters.countryFilter?.length ?? 0) > 0 || filters.genderFilter !== ''
  }

  return {
    pageFilters,
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
