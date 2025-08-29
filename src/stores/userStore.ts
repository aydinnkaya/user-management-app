import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/User'
import { useUsers } from '@/composables/useUsers'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchUsers: apiFetchUsers } = useUsers()

  const fetchUsers = async (count: number) => {
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

  return {
    users,
    loading,
    error,
    fetchUsers,
  }
})
