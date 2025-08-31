import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, PaginationState } from '@/types/User'
import { useUsers } from '@/composables/useUsers'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const paginationSeed = ref<string | null>(null)

  const pagination = ref<PaginationState>({
    currentPage: 1,
    hasMore: true,
    isLoading: false,
    isInitialLoad: true,
    totalLoaded: 0,
    pageSize: 20,
  })

  const generateSeed = (): string => {
    return `infinite_scroll_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  }

  const isAnyLoading = computed(() => loading.value || pagination.value.isLoading)

  const { fetchUsers: apiFetchUsers } = useUsers()

  const fetchUsers = async (totalLimit: number) => {
    if (users.value.length > 0) return

    loading.value = true
    error.value = null

    try {
      const fetchedUsers = await apiFetchUsers(totalLimit)
      users.value = fetchedUsers

      pagination.value = {
        currentPage: 1,
        hasMore: false,
        isLoading: false,
        isInitialLoad: false,
        totalLoaded: fetchedUsers.length,
        pageSize: totalLimit,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
    } finally {
      loading.value = false
    }
  }

  const initializeInfiniteScroll = async (pageSize: number = 20, totalLimit: number) => {
    if (users.value.length > 0) return

    users.value = []
    error.value = null
    paginationSeed.value = generateSeed()

    pagination.value = {
      currentPage: 1,
      hasMore: true,
      isLoading: false,
      isInitialLoad: true,
      totalLoaded: 0,
      pageSize,
    }

    await loadNextPage(totalLimit)
  }

  const loadNextPage = async (totalLimit?: number): Promise<void> => {
    if (pagination.value.isLoading || !pagination.value.hasMore) return

    if (totalLimit && users.value.length >= totalLimit) {
      pagination.value.hasMore = false
      pagination.value.isInitialLoad = false
      return
    }

    const remaining = totalLimit ? totalLimit - users.value.length : pagination.value.pageSize
    const requestSize = Math.min(pagination.value.pageSize, Math.max(0, remaining))

    if (requestSize <= 0) {
      pagination.value.hasMore = false
      pagination.value.isInitialLoad = false
      return
    }

    pagination.value.isLoading = true
    error.value = null

    try {
      const newUsers = await apiFetchUsers(
        requestSize,
        pagination.value.currentPage,
        paginationSeed.value || undefined,
      )

      if (newUsers.length === 0) {
        pagination.value.hasMore = false
      } else {
        const existingIds = new Set(users.value.map((u) => u.id))
        const uniqueNewUsers = newUsers.filter((u) => !existingIds.has(u.id))

        users.value.push(...uniqueNewUsers)

        pagination.value.currentPage += 1
        pagination.value.totalLoaded = users.value.length
        pagination.value.isInitialLoad = false

        const reachedLimit = totalLimit && users.value.length >= totalLimit
        if (newUsers.length < requestSize || reachedLimit) {
          pagination.value.hasMore = false
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load more users'
      console.error('Error loading next page:', err)
    } finally {
      pagination.value.isLoading = false
    }
  }

  const resetInfiniteScroll = () => {
    users.value = []
    error.value = null
    paginationSeed.value = null

    pagination.value = {
      currentPage: 1,
      hasMore: true,
      isLoading: false,
      isInitialLoad: true,
      totalLoaded: 0,
      pageSize: 20,
    }
  }

  const getPaginationStats = () => ({
    totalLoaded: pagination.value.totalLoaded,
    currentPage: pagination.value.currentPage,
    pageSize: pagination.value.pageSize,
    hasMore: pagination.value.hasMore,
    isLoading: pagination.value.isLoading,
    isInitialLoad: pagination.value.isInitialLoad,
    seed: paginationSeed.value,
  })

  return {
    users,
    loading,
    error,
    pagination,
    paginationSeed,
    isAnyLoading,
    fetchUsers,
    initializeInfiniteScroll,
    loadNextPage,
    resetInfiniteScroll,
    getPaginationStats,
    generateSeed,
  }
})
