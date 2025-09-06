import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/models/User'
import { useUsers } from '@/composables/useUsers'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { fetchUsers: apiFetchUsers } = useUsers()

  const fetchUsers = async (count: number) => {
    if (users.value.length > 0) return users.value

    loading.value = true
    error.value = null

    try {
      const data = await apiFetchUsers(count)
      users.value = data
      return users.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
      return []
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
