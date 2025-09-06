<template>
  <article
    class="relative overflow-hidden rounded-[12px] shadow-lg bg-black/5 border border-black/10 select-none w-full max-w-[380px] aspect-[3/4] card-hover cursor-pointer"
    @click="handleCardClick"
  >
    <!-- User Profile Image -->
    <img
      :src="user.picture"
      :alt="`${user.name} profile photo`"
      class="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      loading="lazy"
      draggable="false"
    />

    <!-- Gradient overlays for better text readability -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/60 to-transparent"
    />

    <!-- Favorite Toggle Button -->
    <FavoriteButton :user="user" :onClick="handleFavoriteClick" />

    <!-- User Info: Age, Country Flag, Name -->
    <div class="absolute inset-x-0 bottom-0 px-1 pb-2 pt-2 flex flex-col">
      <div class="flex items-center gap-2">
        <!-- Age -->
        <span
          class="text-white/95 font-bold leading-none drop-shadow text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          {{ user.age }}
        </span>

        <!-- Country + Flag -->
        <span
          class="inline-flex items-center gap-1 px-1 py-0.5 rounded-full bg-white/65 text-gray-800 text-[10px] sm:text-xs md:text-sm max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem] lg:max-w-[14rem] truncate overflow-hidden whitespace-nowrap"
        >
          <img
            v-if="flagSrc"
            :src="flagSrc"
            :alt="`${user.country} flag`"
            class="w-5 h-3 rounded-sm object-cover flex-shrink-0"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
          <span class="truncate">{{ user.country }}</span>
        </span>
      </div>

      <!-- User Name -->
      <h2
        class="mt-1 text-white font-semibold leading-tight drop-shadow-sm text-sm sm:text-base md:text-lg lg:text-xl truncate max-w-full whitespace-nowrap"
      >
        {{ user.name }}
      </h2>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '@/models/User'
import { useSelectedUserStores } from '@/stores/selectedUserStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { getFlagUrl } from '@/lib/flags'
import FavoriteButton from './FavoriteButton.vue'

interface Props {
  user: User
}
const props = defineProps<Props>()

const router = useRouter()
const favoritesStore = useFavoritesStore()
const selectedUserStores = useSelectedUserStores()

const flagSrc = getFlagUrl(props.user.country, 20)

const handleCardClick = () => {
  selectedUserStores.setSelectedUser(props.user)
  router.push(`/user/${props.user.id}`)
}

const handleFavoriteClick = () => {
  favoritesStore.toggleFavorite(props.user)
}
</script>
