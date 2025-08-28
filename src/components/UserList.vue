<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 md:gap-3">
      <div v-for="user in users" :key="user.id">
        <UserCard :user="user" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserCard from '@/components/userCard.vue'
import type { User } from '@/types/User'

interface Props {
  users: User[]
}
defineProps<Props>()
</script>
