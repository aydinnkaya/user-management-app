import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { User } from '@/models/User'
import { safeStorageSet, safeStorageGet } from '@/utils/storage'
import { debounce } from 'lodash'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteUsers = ref<User[]>(safeStorageGet<User[]>('favoriteUsers', []))
  const favoriteCount = computed(() => favoriteUsers.value.length)

  /**
   * Check if a user is in favorites.
   * @param userId - User ID
   * @returns true if user exists in favorites
   */
  const isFavorite = (userId: string) => favoriteUsers.value.some((u) => u.id === userId)

  const addToFavorites = (user: User) => {
    if (!isFavorite(user.id)) {
      favoriteUsers.value.push(user)
    }
  }

  const removeFromFavorites = (userId: string) => {
    const index = favoriteUsers.value.findIndex((u) => u.id === userId)
    if (index !== -1) {
      favoriteUsers.value.splice(index, 1) // splice triggers reactivity
    }
  }

  const toggleFavorite = (user: User) => {
    // isFavorite.value(user.id) ? removeFromFavorites(user.id) : addToFavorites(user)  ***ESLint error
    if (isFavorite(user.id)) {
      removeFromFavorites(user.id)
    } else {
      addToFavorites(user)
    }
  }

  const clearAllFavorites = () => {
    favoriteUsers.value.splice(0, favoriteUsers.value.length)
  }

  const persistFavorites = debounce(() => {
    safeStorageSet('favoriteUsers', favoriteUsers.value)
  }, 50)

  watch(favoriteUsers, persistFavorites, { deep: true })

  return {
    favoriteUsers,
    favoriteCount,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearAllFavorites,
    persistFavorites,
  }
})
