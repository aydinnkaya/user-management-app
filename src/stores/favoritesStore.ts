import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { User } from '@/types/User'
import { safeStorageSet, safeStorageGet } from '@/utils/storage'
import { debounce } from 'lodash'

/**
 * Pinia store for managing favorite users.
 * - Add, remove, toggle, clear favorites
 * - Persist favorites in localStorage
 */
export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteUsers = ref<User[]>(safeStorageGet<User[]>('favoriteUsers', []))
  const favoriteCount = computed(() => favoriteUsers.value.length)

  /**
   * Check if a user is in favorites.
   * @param userId - User ID
   * @returns true if user exists in favorites
   */
  const isFavorite = computed(
    () => (userId: string) => favoriteUsers.value.some((u) => u.id === userId),
  )

  /**
   * Add a user to favorites.
   * @param user - User object
   */
  const addToFavorites = (user: User) => {
    if (!isFavorite.value(user.id)) {
      favoriteUsers.value.push(user)
    }
  }

  /**
   * Remove a user from favorites by ID.
   * @param userId - User ID
   */
  const removeFromFavorites = (userId: string) => {
    favoriteUsers.value = favoriteUsers.value.filter((u) => u.id !== userId)
  }

  /**
   * Toggle favorite state of a user.
   * @param user - User object
   */
  const toggleFavorite = (user: User) => {
    // isFavorite.value(user.id) ? removeFromFavorites(user.id) : addToFavorites(user)  ***ESLint error
    if (isFavorite.value(user.id)) {
      removeFromFavorites(user.id)
    } else {
      addToFavorites(user)
    }
  }

  const clearAllFavorites = () => {
    favoriteUsers.value = []
  }

  const persistFavorites = debounce(() => {
    safeStorageSet('favoriteUsers', favoriteUsers.value)
  }, 200)

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
