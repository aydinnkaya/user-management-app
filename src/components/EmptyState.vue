<template>
  <div class="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
    <!-- Icon -->
    <div
      class="mb-5 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 text-blue-400 flex items-center justify-center"
    >
      <!-- sprite ile -->
      <BaseIcon v-if="spriteName" :name="spriteName" :size="isSm ? 80 : 64" class="text-blue-400" />
    </div>

    <!-- Heading -->
    <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-2 sm:mb-3">
      {{ title }}
    </h2>

    <!-- Message -->
    <p class="text-gray-500 mb-5 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-2">
      {{ message }}
    </p>

    <!-- Button -->
    <router-link
      v-if="route"
      :to="route"
      class="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
    >
      {{ buttonText }}
    </router-link>

    <button
      v-else
      @click="onClick"
      class="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base font-medium"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'

/**
 * Props:
 * - title: Heading text
 * - message: Description text
 * - buttonText: Text for the button
 * - spriteName?: SVG sprite icon name
 * - iconColor?: Tailwind class for icon color
 * - iconSize?: Icon size in px (default: responsive sm:80 / base:64)
 * - route?: Renders a <router-link> if provided
 * - onClick?: Called when button is clicked if no route is provided
 */
interface Props {
  title: string
  message: string
  buttonText: string
  spriteName?: string
  route?: string
  onClick?: () => void
}

defineProps<Props>()

const isSm = computed(() => window.matchMedia('(min-width: 640px)').matches)
</script>
