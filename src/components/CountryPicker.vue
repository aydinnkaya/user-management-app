<template>
  <div class="relative" ref="root">
    <button
      type="button"
      @click="open = !open"
      class="h-10 pl-2 pr-1 rounded-full bg-neutral-800 text-neutral-100 border border-neutral-700 flex items-center gap-2 shadow-sm hover:bg-neutral-800/90 transition"
    >
      <div class="flex -space-x-2">
        <template v-if="modelValue.length">
          <template v-for="(c, i) in topPreview" :key="c">
            <div class="relative">
              <img
                :src="flagOf(c)"
                :alt="`${c} flag`"
                class="w-6 h-6 rounded-full ring-2 ring-neutral-800 object-cover"
              />
              <div
                v-if="i === maxPreview - 1 && modelValue.length > maxPreview"
                class="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full text-white text-[10px] font-semibold"
              >
                +{{ modelValue.length - maxPreview }}
              </div>
            </div>
          </template>
        </template>
        <img
          v-else
          src="/logo/global_icon.svg"
          alt="Global"
          class="w-6 h-6 rounded-full ring-2 ring-neutral-800 object-cover bg-neutral-700 p-1"
          draggable="false"
        />
      </div>

      <svg
        :class="open ? 'rotate-180' : ''"
        class="w-4 h-4 text-neutral-300 transition-transform"
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

    <div
      v-if="open"
      class="absolute right-0 origin-top-right z-20 mt-2 w-[min(26rem,92vw)] rounded-lg bg-neutral-900 border border-neutral-800 shadow-xl"
    >
      <div class="p-3 border-b border-neutral-800">
        <div class="flex items-center gap-2">
          <div class="flex-1 relative">
            <input
              v-model="q"
              type="text"
              placeholder="Search…"
              class="w-full h-10 pl-9 pr-9 rounded-md bg-neutral-800 text-neutral-100 placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM4 9.5C4 6.46 6.46 4 9.5 4S15 6.46 15 9.5 12.54 15 9.5 15 4 12.54 4 9.5z"
              />
            </svg>
            <button
              v-if="q"
              @click="q = ''"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 grid place-items-center rounded hover:bg-neutral-700/60 text-neutral-300"
              aria-label="Clear search"
              type="button"
            >
              <svg viewBox="0 0 20 20" class="w-3.5 h-3.5" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 8.586L6.354 4.94 4.94 6.354 8.586 10l-3.647 3.646 1.414 1.414L10 11.414l3.646 3.646 1.414-1.414L11.414 10l3.646-3.646-1.414-1.414L10 8.586z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul class="max-h-80 overflow-auto divide-y divide-neutral-800">
        <li
          v-for="c in ordered"
          :key="c"
          class="cursor-pointer select-none px-3 py-2.5 hover:bg-neutral-800/70 flex items-center justify-between"
          @click="toggle(c)"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span
              class="inline-flex items-center justify-center w-5 h-5 rounded-full"
              :class="isSelected(c) ? 'bg-rose-500/90' : 'bg-neutral-700'"
            >
              <svg
                v-if="isSelected(c)"
                viewBox="0 0 20 20"
                class="w-3 h-3 text-white"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.535a1 1 0 011.414-1.414l3.051 3.05 6.657-6.657a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <img
              :src="flagOf(c)"
              :alt="`${c} flag`"
              class="w-5 h-3 rounded-sm object-cover shrink-0"
            />
            <span class="truncate text-neutral-100">{{ c }}</span>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <svg class="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v12H4z" opacity=".2" />
              <path
                d="M20 4H4a2 2 0 00-2 2v2h20V6a2 2 0 00-2-2zm0 16H4a2 2 0 01-2-2v-2h20v2a2 2 0 01-2 2z"
              />
              <path d="M8 8h8v8H8z" />
            </svg>
            <span class="text-neutral-300 text-sm">{{ counts[c] ?? 0 }}</span>
          </div>
        </li>
        <li v-if="!ordered.length" class="px-3 py-4 text-neutral-400 text-sm">No matches</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getFlagUrl } from '@/lib/flags'

interface Props {
  modelValue: string[]
  options: string[]
  counts: Record<string, number>
}
const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [string[]] }>()
const open = ref(false)
const q = ref('')
const root = ref<HTMLElement | null>(null)
const maxPreview = 3

const filtered = computed(() => {
  const needle = q.value.trim().toLowerCase()
  return props.options.filter((c) => (needle ? c.toLowerCase().includes(needle) : true))
})

const ordered = computed(() => {
  const sel = filtered.value.filter((c) => props.modelValue.includes(c))
  const rest = filtered.value.filter((c) => !props.modelValue.includes(c))
  const byCount = (a: string, b: string) => (props.counts[b] ?? 0) - (props.counts[a] ?? 0)
  return [...sel.sort(byCount), ...rest.sort(byCount)]
})

const topPreview = computed(() => props.modelValue.slice(0, maxPreview))
const flagOf = (country: string) => getFlagUrl(country, 20) || ''
const isSelected = (c: string) => props.modelValue.includes(c)
function toggle(c: string) {
  const set = new Set(props.modelValue)
  if (set.has(c)) {
    set.delete(c)
  } else {
    set.add(c)
  }
  emit('update:modelValue', Array.from(set))
}

function onClickOutside(e: MouseEvent) {
  if (!root.value) return
  if (!root.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>
