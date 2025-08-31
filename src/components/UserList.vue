<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 md:gap-3">
      <div v-for="user in users" :key="user.id">
        <UserCard :user="user" :show-debug-info="showDebugInfo" />
      </div>
    </div>

    <div v-if="infiniteScrollEnabled" ref="sentinelRef" class="w-full h-4" aria-hidden="true" />

    <div
      v-if="showDebugInfo && isDevelopment"
      class="text-xs text-gray-500 bg-gray-900/50 px-3 py-2 rounded border"
    >
      <div>
        Page: {{ paginationStats?.currentPage || 1 }} | Loaded:
        {{ paginationStats?.totalLoaded || users.length }}
      </div>
      <div>
        Has More: {{ paginationStats?.hasMore ? 'Yes' : 'No' }} | Loading:
        {{ paginationStats?.isLoading ? 'Yes' : 'No' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick, onMounted, onUnmounted } from 'vue'
import UserCard from '@/components/userCard.vue'
import type { User } from '@/types/User'

interface Props {
  users: User[]
  showDebugInfo?: boolean
  infiniteScrollEnabled?: boolean
  onLoadMore?: () => Promise<void>
  hasMore?: boolean
  paginationStats?: {
    currentPage: number
    totalLoaded: number
    hasMore: boolean
    isLoading: boolean
    isInitialLoad: boolean
  }
}

const props = withDefaults(defineProps<Props>(), {
  showDebugInfo: false,
  infiniteScrollEnabled: false,
  hasMore: true,
})

const sentinelRef = ref<HTMLElement | null>(null)
const isDevelopment = computed(() => import.meta.env.DEV === true)

let observer: IntersectionObserver | null = null

const setupObserver = () => {
  if (!window.IntersectionObserver || !sentinelRef.value || !props.infiniteScrollEnabled) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && props.hasMore && props.onLoadMore) {
          props.onLoadMore()
        }
      })
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    },
  )

  observer.observe(sentinelRef.value)
}

const cleanupObserver = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

watch(
  sentinelRef,
  (el) => {
    cleanupObserver()
    if (props.infiniteScrollEnabled && el) {
      nextTick(() => {
        setupObserver()
      })
    }
  },
  { flush: 'post' },
)

watch(
  () => props.infiniteScrollEnabled,
  (enabled) => {
    cleanupObserver()
    if (enabled && sentinelRef.value) {
      nextTick(() => {
        setupObserver()
      })
    }
  },
)

watch(
  () => props.hasMore,
  (hasMore) => {
    if (!hasMore) {
      cleanupObserver()
    } else if (props.infiniteScrollEnabled && sentinelRef.value) {
      nextTick(() => {
        setupObserver()
      })
    }
  },
)

onMounted(() => {
  if (props.infiniteScrollEnabled && sentinelRef.value) {
    nextTick(() => {
      setupObserver()
    })
  }
})

onUnmounted(() => {
  cleanupObserver()
})
</script>
