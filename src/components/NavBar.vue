<template>
  <nav
    class="fixed bottom-0 inset-x-0 md:sticky md:top-0 z-50 bg-black backdrop-blur"
    :class="isScrolled ? 'shadow-lg' : 'shadow-none'"
  >
    <div class="relative w-full h-16 px-3 sm:px-6 lg:px-8">
      <ul
        class="absolute inset-0 w-full h-full grid grid-cols-5 place-items-center md:flex md:items-center md:justify-center md:gap-8 lg:gap-10 xl:gap-12 text-sm font-medium text-white"
      >
        <!-- Home -->
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            :class="isActive('home') ? 'text-blue-400' : 'hover:text-blue-400'"
          >
            <img :src="icon('home', 'home.svg', 'home_touch.svg')" alt="Home" class="h-6 w-6" />
            <span class="hidden md:block">For You</span>
          </RouterLink>
        </li>

        <!-- Favorites -->
        <li class="relative">
          <RouterLink
            :to="{ name: 'favorites' }"
            :class="isActive('favorites') ? 'text-blue-400' : 'hover:text-blue-400'"
          >
            <img
              :src="icon('favorites', 'follow.svg', 'follow_touch.svg')"
              alt="Favorites"
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

        <!-- Explore -->
        <li>
          <RouterLink
            :to="{ name: 'explore' }"
            :class="isActive('explore') ? 'text-blue-400' : 'hover:text-blue-400'"
          >
            <img
              :src="icon('explore', 'leaderboard.svg', 'leaderboard_touch.svg')"
              alt="Explore"
              class="h-6 w-6"
            />
            <span class="hidden md:block">Explore</span>
          </RouterLink>
        </li>

        <!-- Chats -->
        <li>
          <RouterLink
            :to="{ name: 'chats' }"
            :class="isActive('chats') ? 'text-blue-400' : 'hover:text-blue-400'"
          >
            <img
              :src="icon('chats', 'message.svg', 'messages_touch.svg')"
              alt="Chats"
              class="h-6 w-6"
            />
            <span class="hidden md:block">Chats</span>
          </RouterLink>
        </li>

        <!-- Profile -->
        <li>
          <RouterLink
            :to="{ name: 'profile' }"
            :class="isActive('profile') ? 'text-blue-400' : 'hover:text-blue-400'"
          >
            <img
              :src="icon('profile', 'profile.svg', 'profile_touch.svg')"
              alt="Profile"
              class="h-6 w-6"
            />
            <span class="hidden md:block">Profile</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoritesStore } from '@/stores/favoritesStore'

const route = useRoute()
const favoritesStore = useFavoritesStore()

// direct computed üzerinden bağlanıyoruz
const favoriteCount = computed(() => favoritesStore.favoriteUsers.length)

const isScrolled = ref(false)
const onScroll = () => (isScrolled.value = window.scrollY > 8)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const currentName = computed(() => (route.name as string) || '')
const isActive = (name: string) => currentName.value === name

const icon = (name: string, normal: string, touch: string) =>
  `/logo/${isActive(name) ? touch : normal}`
</script>
