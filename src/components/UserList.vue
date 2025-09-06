<template>
  <div class="flex-1 overflow-y-auto overflow-x-hidden">
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 p-2 pb-20 md:pb-8">
      <div v-for="user in users" :key="user.id">
        <UserCard :user="user" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import type { User } from '@/models/User'

interface Props {
  users: User[]
}
defineProps<Props>()
</script>
