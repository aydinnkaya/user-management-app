<template>
  <button
    class="absolute top-1.5 right-1.5 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md transition hover:bg-white active:scale-95"
    :class="{ 'bg-rose-100': isFavorite(user.id) }"
    @click.stop="handleClick"
    aria-label="Toggle favorite"
    :title="isFavorite(user.id) ? 'Remove from favorites' : 'Add to favorites'"
  >
    <!-- Favorite Icon -->
    <img
      v-if="isFavorite(user.id)"
      src="/logo/favorite_heart_pink.svg"
      alt="Favorite"
      class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
      aria-hidden="true"
    />

    <!-- Not Favorite Icon -->
    <img
      v-else
      src="/logo/favorite_heart.svg"
      alt="Not Favorite"
      class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
      aria-hidden="true"
    />
  </button>
</template>

<script setup lang="ts">
import type { User } from '@/types/User'
import { useFavoritesStore } from '@/stores/favoritesStore'

const props = defineProps<{
  user: User
  onClick?: (user: User) => void
}>()

const favoritesStore = useFavoritesStore()

const isFavorite = (id: string) => favoritesStore.isFavorite(id)

const handleClick = () => {
  if (props.onClick) {
    props.onClick(props.user)
  } else {
    favoritesStore.toggleFavorite(props.user)
  }
}
</script>
