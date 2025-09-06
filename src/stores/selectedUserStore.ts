import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/models/User'

export const useSelectedUserStores = defineStore('selectedUser', () => {
  const selectedUser = ref<User | null>(null)

  const setSelectedUser = (user: User) => {
    selectedUser.value = user
  }

  const clearSelectedUser = () => {
    selectedUser.value = null
  }

  return {
    selectedUser,
    setSelectedUser,
    clearSelectedUser,
  }
})
