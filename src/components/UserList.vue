<template>
  <div class="flex-1 overflow-y-auto overflow-x-hidden">
    <!-- User Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 p-2 pb-20 md:pb-8">
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
      ref="sentinelRef"
      class="h-4 w-full"
      v-if="pagination.hasMore && !pagination.isInitialLoad"
    ></div>

    <!-- End of List Message -->
    <div
      v-if="!pagination.hasMore && !pagination.isInitialLoad && users.length > 0"
      class="text-center py-6 text-neutral-500"
    >
      All users loaded ({{ users.length }} users)
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import UserCard from '@/components/UserCard.vue'
import type { User, PaginationState } from '@/models/User'

interface Props {
  users: User[]
  pagination: PaginationState
}

defineProps<Props>()

const loadNextPage = inject<() => Promise<void>>('loadNextPage')
const sentinelRef = ref<HTMLElement>()

const { setSentinel } = useInfiniteScroll(() => loadNextPage?.(), {
  threshold: 0.1,
  rootMargin: '200px',
  debounceMs: 10,
})

watch(sentinelRef, (element) => element && setSentinel(element), { immediate: true })
</script>
