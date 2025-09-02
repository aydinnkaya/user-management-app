<template>
  <div class="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
    <!-- Icon -->
    <div class="mb-5 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 text-blue-400">
      <img v-if="icon" :src="icon" alt="icon" class="w-full h-full" />
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
import { defineProps } from 'vue'

interface Props {
  title: string
  message: string
  buttonText: string
  icon?: string
  route?: string
  onClick?: () => void
}

const props = defineProps<Props>()
const { title, message, buttonText, icon, route, onClick } = props
</script>
