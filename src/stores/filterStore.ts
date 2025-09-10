import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { useFavoritesStore } from './favoritesStore'
import { COUNTRY_LIST, COUNTRY_MAP } from '@/lib/countries'
import type { User, PageFilters, FilterState, Gender } from '@/models/User'

export const useFilterStore = defineStore('filterUsers', () => {
  const { users: allUsers } = storeToRefs(useUserStore())
  const { favoriteUsers } = storeToRefs(useFavoritesStore())

  const pageFilters = ref<PageFilters>({
    home: { countryFilter: [], genderFilter: '' },
    favorites: { countryFilter: [], genderFilter: '' },
  })

  const getCountryCounts = (users: User[]) => {
    const counts = Object.fromEntries(COUNTRY_LIST.map((c) => [c.iso2, 0]))
    users.forEach((user) => {
      const country = COUNTRY_MAP.get(user.country.toLowerCase())
      if (country) counts[country.iso2]++
    })
    return counts
  }

  const getFilteredUsers = (users: User[], { countryFilter, genderFilter }: FilterState) => {
    if (!users.length || (!countryFilter.length && !genderFilter)) return users

    return users.filter((user) => {
      const country = COUNTRY_MAP.get(user.country.toLowerCase())
      return (
        (!countryFilter.length || (country && countryFilter.includes(country.iso2))) &&
        (!genderFilter || user.gender === genderFilter)
      )
    })
  }

  const homeFilteredUsers = computed(() => getFilteredUsers(allUsers.value, pageFilters.value.home))

  const favoritesFilteredUsers = computed(() =>
    getFilteredUsers(favoriteUsers.value, pageFilters.value.favorites),
  )

  const getCountryCountsForPage = (page: keyof PageFilters) => {
    const baseUsers = page === 'home' ? allUsers.value : favoriteUsers.value
    const { genderFilter } = pageFilters.value[page]

    const usersToCount = genderFilter
      ? baseUsers.filter((user) => user.gender === genderFilter)
      : baseUsers

    return getCountryCounts(usersToCount)
  }

  const updateCountryFilter = (page: keyof PageFilters, countries: string[]) => {
    pageFilters.value[page].countryFilter = countries
  }

  const updateGenderFilter = (page: keyof PageFilters, gender: Gender | '') => {
    pageFilters.value[page].genderFilter = gender
  }

  const clearFilters = (page: keyof PageFilters) => {
    pageFilters.value[page] = { countryFilter: [], genderFilter: '' }
  }

  const getFilterState = (page: keyof PageFilters) => pageFilters.value[page]

  const hasActiveFilters = (page: keyof PageFilters) => {
    const { countryFilter, genderFilter } = pageFilters.value[page]
    return countryFilter.length > 0 || !!genderFilter
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
