import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, PaginationState } from '@/models/User'
import { useUsers } from '@/composables/useUsers'

export const useUserStore = defineStore('user', () => {
  const MAX_USERS = 200
  const PAGE_SIZE = 20

  const users = ref<User[]>([])
  const error = ref<string | null>(null)
  const seed = ref<string | null>(null)
  const pagination = ref<PaginationState>({
    currentPage: 1,
    hasMore: true,
    isLoading: false,
    isInitialLoad: true,
    totalLoaded: 0,
    pageSize: PAGE_SIZE,
  })

  const isLoading = computed(() => pagination.value.isLoading)

  const { fetchUsers } = useUsers()

  const generateSeed = () => `infinite_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

  const resetPagination = () => {
    Object.assign(pagination.value, {
      currentPage: 1,
      hasMore: true,
      isLoading: false,
      isInitialLoad: true,
      totalLoaded: 0,
      pageSize: PAGE_SIZE,
    })
  }

  const updatePagination = (newUsersCount: number) => {
    pagination.value.currentPage++
    pagination.value.totalLoaded = users.value.length
    pagination.value.isInitialLoad = false
    pagination.value.hasMore = users.value.length < MAX_USERS && newUsersCount > 0
  }

  const initializeInfiniteScroll = async () => {
    if (users.value.length > 0) return

    users.value = []
    error.value = null
    seed.value = generateSeed()
    resetPagination()
    await loadNextPage()
  }

  const loadNextPage = async () => {
    const canLoadMore =
      !pagination.value.isLoading && pagination.value.hasMore && users.value.length < MAX_USERS

    if (!canLoadMore) {
      pagination.value.hasMore = false
      return
    }

    pagination.value.isLoading = true
    error.value = null

    try {
      const newUsers = await fetchUsers(PAGE_SIZE, pagination.value.currentPage, seed.value!)

      if (newUsers.length === 0) {
        pagination.value.hasMore = false
        return
      }

      const remainingSlots = MAX_USERS - users.value.length
      const usersToAdd = newUsers.slice(0, remainingSlots)

      users.value.push(...usersToAdd)
      updatePagination(usersToAdd.length)

      // console.log(
      //   pagination.value.hasMore
      //     ? `${users.value.length}/${MAX_USERS} kullanicilar yüklendi`
      //     : `Tüm kullanicilar yüklendi (${users.value.length} kullanici)`,
      // )
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Loading failed'
      console.error('Load error:', err)
    } finally {
      pagination.value.isLoading = false
    }
  }

  const reset = () => {
    users.value = []
    error.value = null
    seed.value = null
    resetPagination()
  }

  return {
    users,
    error,
    pagination,
    isLoading,
    MAX_USERS,
    initializeInfiniteScroll,
    loadNextPage,
    reset,
  }
})
