<template>
  <div class="relative z-40 inline-block align-top">
    <button
      type="button"
      @click="toggle"
      :aria-expanded="isOpen ? 'true' : 'false'"
      class="h-8 sm:h-9 min-w-[7rem] sm:min-w-[8rem] w-auto rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-800/80 pl-3 pr-8 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500/70 text-[11px] sm:text-xs shadow-sm"
    >
      <span class="truncate leading-none">{{ selectedLabel }}</span>
      <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
        <BaseIcon name="dropdown_arrow" size="14" class="text-neutral-400" />
      </span>
    </button>

    <transition
      enter-active-class="transition ease-out duration-120"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute top-[calc(100%+4px)] min-w-[7rem] sm:min-w-[8rem] rounded-xl border border-neutral-800/80 bg-neutral-900/95 backdrop-blur-sm shadow-lg overflow-hidden z-50"
        role="listbox"
      >
        <div class="py-0.5 max-h-48 overflow-auto overscroll-contain">
          <button
            type="button"
            @click="selectOption('')"
            :class="optionClass(modelValue === '')"
            role="option"
            :aria-selected="modelValue === ''"
          >
            {{ t('filters.allGenders') }}
          </button>

          <button
            v-for="gender in genders"
            :key="gender"
            type="button"
            @click="selectOption(gender)"
            :class="optionClass(modelValue === gender)"
            role="option"
            :aria-selected="modelValue === gender"
          >
            <span class="truncate">{{ t(`filters.gender.${gender}`) }}</span>
          </button>
        </div>
      </div>
    </transition>

    <div v-if="isOpen" @click="close" class="fixed inset-0 z-30"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseIcon from './BaseIcon.vue'
import type { Gender } from '@/models/User'
import { GENDER_LIST } from '@/lib/genders'

const props = defineProps<{
  modelValue: Gender | ''
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Gender | '']
}>()

const { t } = useI18n()
const isOpen = ref(false)
const genders = computed<readonly Gender[]>(() => GENDER_LIST)

const selectedLabel = computed(() =>
  props.modelValue ? t(`filters.gender.${props.modelValue}`) : t('filters.allGenders'),
)

function optionClass(active: boolean) {
  return [
    'w-full flex items-center justify-between gap-2 px-3 py-1.5 text-left',
    'text-[12px] sm:text-[13px] leading-tight',
    'transition-colors',
    active
      ? 'bg-blue-600/90 text-white'
      : 'text-neutral-100 hover:bg-neutral-800/80 focus:bg-neutral-800/80',
  ]
}

function selectOption(value: Gender | '') {
  emit('update:modelValue', value)
  isOpen.value = false
}
function toggle() {
  isOpen.value = !isOpen.value
}
function close() {
  isOpen.value = false
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>
