import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/User'

export const useSelectedUserStores = defineStore('selectedUser', () => {
  // state
  const selectedUser = ref<User | null>(null)

  // actions
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
