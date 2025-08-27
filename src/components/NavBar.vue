<template>
  <nav
    :class="[
      'fixed bottom-0 inset-x-0 md:sticky md:top-0 z-50',
      'bg-black backdrop-blur',
      isScrolled ? 'shadow-lg' : 'shadow-none',
    ]"
  >
    <div class="relative w-full h-16 px-3 sm:px-6 lg:px-8">
      <ul
        class="absolute inset-0 w-full h-full grid grid-cols-5 place-items-center md:flex md:items-center md:justify-center md:gap-8 lg:gap-10 xl:gap-12 text-sm font-medium text-white"
      >
        <li class="w-full h-full md:w-auto md:h-auto">
          <RouterLink
            :to="{ name: 'home' }"
            :aria-current="isActive('home') ? 'page' : undefined"
            class="flex flex-col items-center justify-center gap-0.5 sm:gap-1 w-full h-full md:w-auto md:h-auto hover:text-blue-400"
            :class="isActive('home') ? 'text-blue-400' : ''"
          >
            <img
              :src="icon('home', 'home.svg', 'home_touch.svg')"
              alt="Home Icon"
              class="h-6 w-6"
            />
            <span class="hidden md:block">For You</span>
          </RouterLink>
        </li>

        <li class="w-full h-full md:w-auto md:h-auto">
          <RouterLink
            :to="{ name: 'favorites' }"
            :aria-current="isActive('favorites') ? 'page' : undefined"
            class="relative flex flex-col items-center justify-center gap-0.5 sm:gap-1 w-full h-full md:w-auto md:h-auto hover:text-blue-400"
            :class="isActive('favorites') ? 'text-blue-400' : ''"
          >
            <img
              :src="icon('favorites', 'follow.svg', 'follow_touch.svg')"
              alt="Favorites Icon"
              class="h-6 w-6"
            />
            <span
              v-if="favoriteCount > 0"
              class="absolute top-2 right-4 md:right-[-6px] bg-red-500 text-white text-[10px] leading-none rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"
            >
              {{ favoriteCount > 99 ? '99+' : favoriteCount }}
            </span>
            <span class="hidden md:block">Favorites</span>
          </RouterLink>
        </li>

        <!-- EXPLORE -->
        <li class="w-full h-full md:w-auto md:h-auto">
          <RouterLink
            :to="{ name: 'explore' }"
            :aria-current="isActive('explore') ? 'page' : undefined"
            class="flex flex-col items-center justify-center gap-0.5 sm:gap-1 w-full h-full md:w-auto md:h-auto hover:text-blue-400"
            :class="isActive('explore') ? 'text-blue-400' : ''"
          >
            <img
              :src="icon('explore', 'leaderboard.svg', 'leaderboard_touch.svg')"
              alt="Explore Icon"
              class="h-6 w-6"
            />
            <span class="hidden md:block">Explore</span>
          </RouterLink>
        </li>

        <li class="w-full h-full md:w-auto md:h-auto">
          <RouterLink
            :to="{ name: 'chats' }"
            :aria-current="isActive('chats') ? 'page' : undefined"
            class="flex flex-col items-center justify-center gap-0.5 sm:gap-1 w-full h-full md:w-auto md:h-auto hover:text-blue-400"
            :class="isActive('chats') ? 'text-blue-400' : ''"
          >
            <img
              :src="icon('chats', 'message.svg', 'messages_touch.svg')"
              alt="Chats Icon"
              class="h-6 w-6"
            />
            <span class="hidden md:block">Chats</span>
          </RouterLink>
        </li>

        <li class="w-full h-full md:w-auto md:h-auto">
          <RouterLink
            :to="{ name: 'profile' }"
            :aria-current="isActive('profile') ? 'page' : undefined"
            class="flex flex-col items-center justify-center gap-0.5 sm:gap-1 w-full h-full md:w-auto md:h-auto hover:text-blue-400"
            :class="isActive('profile') ? 'text-blue-400' : ''"
          >
            <img
              :src="icon('profile', 'profile.svg', 'profile_touch.svg')"
              alt="Profile Icon"
              class="h-6 w-6"
            />
            <span class="hidden md:block">Profile</span>
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="pb-[env(safe-area-inset-bottom)] md:pb-0"></div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'

const route = useRoute()
const userStore = useUserStore()
const { favoriteCount } = storeToRefs(userStore)

const isScrolled = ref(false)
const onScroll = () => {
  isScrolled.value = window.scrollY > 8
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const currentName = computed(() => (route.name as string) || '')
const isActive = (name: string) => currentName.value === name

const icon = (name: string, normal: string, touch: string) =>
  `/logo/${isActive(name) ? touch : normal}`
</script>
