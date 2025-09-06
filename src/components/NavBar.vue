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
            :class="[
              'flex flex-col items-center justify-center gap-1 text-center h-16',
              isActive('home') ? 'text-blue-400' : 'hover:text-blue-400',
            ]"
          >
            <BaseIcon :name="isActive('home') ? 'home_touch' : 'home'" size="24" class="h-6 w-6" />
            <span class="hidden md:block leading-none">{{ $t('navigation.home') }}</span>
          </RouterLink>
        </li>

        <!-- Favorites -->
        <li>
          <RouterLink
            :to="{ name: 'favorites' }"
            :class="[
              'flex flex-col items-center justify-center gap-1 text-center h-16',
              isActive('favorites') ? 'text-blue-400' : 'hover:text-blue-400',
            ]"
          >
            <div class="relative">
              <BaseIcon
                :name="isActive('favorites') ? 'follow_touch' : 'follow'"
                size="24"
                class="h-6 w-6"
              />
              <!-- <span
                v-if="favoriteCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"
              >
                {{ favoriteCount > 99 ? '99+' : favoriteCount }}
              </span> -->
            </div>
            <span class="hidden md:block leading-none">{{ $t('navigation.favorites') }}</span>
          </RouterLink>
        </li>

        <!-- Explore -->
        <li>
          <RouterLink
            :to="{ name: 'explore' }"
            :class="[
              'flex flex-col items-center justify-center gap-1 text-center h-16',
              isActive('explore') ? 'text-blue-400' : 'hover:text-blue-400',
            ]"
          >
            <BaseIcon
              :name="isActive('explore') ? 'leaderboard_touch' : 'leaderboard'"
              size="24"
              class="h-6 w-6"
            />
            <span class="hidden md:block leading-none">{{ $t('navigation.explore') }}</span>
          </RouterLink>
        </li>

        <!-- Chats -->
        <li>
          <RouterLink
            :to="{ name: 'chats' }"
            :class="[
              'flex flex-col items-center justify-center gap-1 text-center h-16',
              isActive('chats') ? 'text-blue-400' : 'hover:text-blue-400',
            ]"
          >
            <BaseIcon
              :name="isActive('chats') ? 'messages_touch' : 'message'"
              size="24"
              class="h-6 w-6"
            />
            <span class="hidden md:block leading-none">{{ $t('navigation.chats') }}</span>
          </RouterLink>
        </li>

        <!-- Profile -->
        <li>
          <RouterLink
            :to="{ name: 'profile' }"
            :class="[
              'flex flex-col items-center justify-center gap-1 text-center h-16',
              isActive('profile') ? 'text-blue-400' : 'hover:text-blue-400',
            ]"
          >
            <BaseIcon
              :name="isActive('profile') ? 'profile_touch' : 'profile'"
              size="24"
              class="h-6 w-6"
            />
            <span class="hidden md:block leading-none">{{ $t('navigation.profile') }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
// import { useFavoritesStore } from '@/stores/favoritesStore'
import BaseIcon from '@/components/BaseIcon.vue'

const route = useRoute()
// const favoritesStore = useFavoritesStore()

// const favoriteCount = computed(() => favoritesStore.favoriteUsers.length)

const isScrolled = ref(false)
const onScroll = () => (isScrolled.value = window.scrollY > 8)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const currentName = computed(() => (route.name as string) || '')
const isActive = (name: string) => currentName.value === name
</script>
