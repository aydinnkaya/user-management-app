<template>
  <div class="relative z-40 min-w-[6.5rem] sm:min-w-[7rem] md:min-w-[8rem] max-w-fit">
    <!-- Trigger Button -->
    <button
      @click="isOpen = !isOpen"
      class="h-9 w-full rounded-full bg-neutral-800 text-neutral-100 border border-neutral-700 px-2 pr-7 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
    >
      <span class="truncate">{{ selectedLabel }}</span>

      <svg
        :class="[
          'w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-300 transition-transform',
          { 'rotate-180': isOpen },
        ]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute left-0 right-0 top-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-50"
    >
      <button
        @click="selectOption('')"
        :class="[
          'w-full px-3 py-2 text-left text-xs sm:text-sm',
          modelValue === '' ? 'bg-blue-600 text-white' : 'text-neutral-100 hover:bg-neutral-700',
        ]"
      >
        {{ $t('filters.allGenders') }}
      </button>

      <button
        v-for="gender in genders"
        :key="gender"
        @click="selectOption(gender)"
        :class="[
          'w-full px-3 py-2 text-left text-xs sm:text-sm',
          modelValue === gender
            ? 'bg-blue-600 text-white'
            : 'text-neutral-100 hover:bg-neutral-700',
        ]"
      >
        {{ $t(`filters.gender.${gender}`) }}
      </button>
    </div>

    <!-- Click Outside -->
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-30"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const userStore = useUserStore()
const isOpen = ref(false)

const genders = computed(() => {
  const uniqueGenders = new Set<string>()
  userStore.users.forEach((u) => uniqueGenders.add(u.gender))
  return Array.from(uniqueGenders)
})

const selectedLabel = computed(() => {
  if (!props.modelValue) {
    return 'AllGenders'
  }
  return props.modelValue
})

function selectOption(value: string) {
  emit('update:modelValue', value)
  isOpen.value = false
}
</script>
