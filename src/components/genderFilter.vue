<template>
  <div class="relative z-40 min-w-[9.5rem] sm:min-w-[10rem] md:min-w-[10rem]">
    <select
      :value="modelValue"
      @change="handleGenderChange"
      class="h-9 w-full rounded-full bg-neutral-800 text-neutral-100 border border-neutral-700 pl-2 pr-9 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
    >
      <option value="">All Genders</option>
      <option v-for="gender in genders" :key="gender" :value="gender">
        {{ gender.charAt(0).toUpperCase() + gender.slice(1) }}
      </option>
    </select>
    <svg
      class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const userStore = useUserStore()

const genders = computed(() => {
  const uniqueGenders = new Set<string>()
  userStore.users.forEach((u) => uniqueGenders.add(u.gender))
  return Array.from(uniqueGenders)
})

function handleGenderChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>
