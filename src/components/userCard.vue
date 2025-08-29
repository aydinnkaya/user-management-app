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
    <button
      class="absolute top-1.5 right-1.5 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md transition hover:bg-white active:scale-95"
      :class="{ 'bg-rose-100': favoritesStore.isFavorite(user.id) }"
      @click.stop="handleFavoriteClick"
      aria-label="Toggle favorite"
      :title="favoritesStore.isFavorite(user.id) ? 'Remove from favorites' : 'Add to favorites'"
    >
      <HeartSolid
        v-if="favoritesStore.isFavorite(user.id)"
        class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-rose-600"
        aria-hidden="true"
      />
      <HeartOutline
        v-else
        class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700"
        aria-hidden="true"
      />
    </button>

    <!-- User Info: Age, Country Flag, Name -->
    <div
      class="absolute inset-x-0 bottom-0 px-3 sm:px-4 md:px-5 pb-2.5 sm:pb-3 md:pb-3.5 pt-2 md:pt-2.5"
    >
      <div class="flex items-center justify-between gap-2">
        <!-- Age -->
        <span
          class="ml-1 text-white/95 font-bold leading-none drop-shadow text-xl sm:text-2xl md:text-3xl"
        >
          {{ user.age }}
        </span>

        <!-- Country + Flag -->
        <span
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/65 text-gray-800 text-xs"
        >
          <img
            v-if="flagSrc"
            :src="flagSrc"
            :alt="`${user.country} flag`"
            class="w-5 h-3 rounded-sm object-cover"
            loading="lazy"
            referrerpolicy="no-referrer"
          />
          <span class="truncate max-w-[12ch]">{{ user.country }}</span>
        </span>
      </div>

      <!-- User Name -->
      <h2
        class="mt-1.5 ml-1 text-white leading-tight drop-shadow-sm font-semibold text-base sm:text-lg md:text-xl lg:text-2xl"
      >
        {{ user.name }}
      </h2>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '@/types/User'
import { useSelectedUserStores } from '@/stores/selectedUserStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { getFlagUrl } from '@/lib/flags'
import { HeartIcon as HeartSolid } from '@heroicons/vue/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/vue/24/outline'

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
