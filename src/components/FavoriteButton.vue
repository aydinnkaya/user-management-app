<template>
  <button
    class="absolute top-1.5 right-1.5 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md transition hover:bg-white active:scale-95"
    :class="{ 'bg-rose-100': isFav }"
    @click.stop="handleClick"
    aria-label="Toggle favorite"
    :title="isFav ? 'Remove from favorites' : 'Add to favorites'"
  >
    <!-- Favorite / Not Favorite Icon (sprite) -->
    <BaseIcon
      :name="isFav ? 'favorite_heart_pink' : 'favorite_heart'"
      class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
      aria-hidden="true"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/types/User'
import { useFavoritesStore } from '@/stores/favoritesStore'
import BaseIcon from '@/components/BaseIcon.vue'

const props = defineProps<{
  user: User
  onClick?: (user: User) => void
}>()

const favoritesStore = useFavoritesStore()

const isFav = computed(() => favoritesStore.isFavorite(props.user.id))

const handleClick = () => {
  if (props.onClick) {
    props.onClick(props.user)
  } else {
    favoritesStore.toggleFavorite(props.user)
  }
}
</script>
