<template>
  <svg
    :width="pixelSize"
    :height="pixelSize"
    v-bind="$attrs"
    :class="$attrs.class"
    aria-hidden="true"
    focusable="false"
  >
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
  }>(),
  { size: 24 },
)

const pixelSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size)) // 32 - 2rem
</script>

//<!-- :class="['inline-block align-middle', $attrs.class]" -->
