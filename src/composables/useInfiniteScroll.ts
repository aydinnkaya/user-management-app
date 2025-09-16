import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { InfiniteScrollConfig } from '@/models/User'

export function useInfiniteScroll(
  callback: () => Promise<void> | void,
  config: InfiniteScrollConfig = {},
) {
  const { threshold = 0, rootMargin = '300px' } = config

  const sentinelElement = ref<HTMLElement | null>(null)
  let sentinelObserver: IntersectionObserver | null = null
  let isExecuting: boolean = false

  const executeCallback = async () => {
    if (isExecuting) return

    isExecuting = true
    try {
      await callback()
    } catch (err) {
      console.error('Infinite scroll callback error:', err)
    } finally {
      isExecuting = false
    }
  }

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0]?.isIntersecting) {
      console.log('Calling executeCallback')

      executeCallback()
    }
  }

  const initializeObserver = () => {
    if (!sentinelElement.value) return

    sentinelObserver = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin,
      threshold,
    })

    sentinelObserver.observe(sentinelElement.value)
  }

  const cleanup = () => {
    sentinelObserver?.disconnect()
    sentinelObserver = null
    isExecuting = false
  }

  const setSentinel = (element: HTMLElement | null) => {
    cleanup()
    sentinelElement.value = element
    if (element) {
      nextTick(initializeObserver)
    }
  }

  onMounted(() => {
    nextTick(initializeObserver)
  })

  onUnmounted(cleanup)

  return {
    sentinelElement,
    setSentinel,
  }
}
