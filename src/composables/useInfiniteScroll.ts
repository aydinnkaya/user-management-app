import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { InfiniteScrollConfig } from '@/models/User'

export function useInfiniteScroll(
  callback: () => Promise<void> | void,
  config: InfiniteScrollConfig = {},
) {
  const { threshold, rootMargin, debounceMs } = config

  const sentinelElement = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  const executeCallback = async () => {
    try {
      await callback()
    } catch (err) {
      console.error('Infinite scroll callback error:', err)
    }
  }

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (!entries[0]?.isIntersecting) return

    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(executeCallback, debounceMs)
  }

  const initializeObserver = () => {
    if (!sentinelElement.value) return

    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin,
      threshold,
    })

    observer.observe(sentinelElement.value)
  }

  const cleanup = () => {
    observer?.disconnect()
    observer = null
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
  }

  const setSentinel = (element: HTMLElement | null) => {
    cleanup()
    sentinelElement.value = element
    if (element) nextTick(initializeObserver)
  }

  onMounted(() => nextTick(initializeObserver))
  onUnmounted(cleanup)

  return { sentinelElement, setSentinel }
}
