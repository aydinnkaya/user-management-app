<template>
  <div
    class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-800"
  >
    <!-- User Grid -->
    <div
      class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 px-1 sm:px-2 pb-20 md:pb-8"
    >
      <div v-for="user in users" :key="user.id">
        <UserCard :user="user" />
      </div>
    </div>

    <!-- Loading Indicator -->
    <div
      v-if="pagination.isLoading && !pagination.isInitialLoad"
      class="flex justify-center items-center py-6"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-2 border-neutral-600 border-t-blue-500"
      ></div>
    </div>

    <!-- Scroll Sentinel -->
    <div
      v-if="pagination.hasMore && !pagination.isInitialLoad"
      ref="sentinelRef"
      class="h-20 w-full"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import UserCard from '@/components/userCard.vue'
import type { User, PaginationState } from '@/models/User'

interface Props {
  users: User[]
  pagination: PaginationState
}

defineProps<Props>()

const loadNextPage = inject<() => Promise<void>>('loadNextPage')
const sentinelRef = ref<HTMLElement>()

const { setSentinel } = useInfiniteScroll(() => loadNextPage?.(), {
  threshold: 0,
  rootMargin: '300px',
})

watch(
  sentinelRef,
  (element) => {
    if (element) {
      setSentinel(element)
    }
  },
  { immediate: true },
)
</script>
