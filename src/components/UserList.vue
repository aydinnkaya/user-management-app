<template>
  <div class="space-y-6">
    <div
      v-if="showError && error"
      class="rounded-lg border border-red-400 bg-red-500/10 text-red-200 px-4 py-3 flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.595c.75 1.335-.213 3.006-1.743 3.006H3.482c-1.53 0-2.493-1.671-1.743-3.006L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="text-sm">{{ error }}</span>
      </div>
      <button
        @click="handleTryAgain"
        class="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>

    <div v-if="showLoading && loading" class="flex justify-center items-center py-10">
      <div class="relative">
        <div
          class="animate-spin rounded-full h-10 w-10 border-2 border-neutral-600 border-t-blue-500"
        ></div>
      </div>
    </div>

    <div v-else-if="users.length > 0" :class="gridClass">
      <div v-for="user in users" :key="user.id">
        <UserCard :user="user" />
      </div>
    </div>

    <div v-else class="text-center py-10 text-neutral-400">
      <p class="text-base sm:text-lg">{{ emptyMessage }}</p>
      <p class="text-xs sm:text-sm mt-2">{{ emptySubMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserCard from '@/components/userCard.vue'
import type { User } from '@/types/User'

interface Props {
  users: User[]
  loading?: boolean
  error?: string | null
  gridClass?: string
  emptyMessage?: string
  emptySubMessage?: string
  showError?: boolean
  showLoading?: boolean
  onTryAgain?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  gridClass: 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 md:gap-3',
  emptyMessage: 'No users found.',
  emptySubMessage: 'Try adjusting your filters.',
  showError: true,
  showLoading: true,
})

const emit = defineEmits<{
  tryAgain: []
}>()

function handleTryAgain() {
  if (props.onTryAgain) {
    props.onTryAgain()
  } else {
    emit('tryAgain')
  }
}
</script>
