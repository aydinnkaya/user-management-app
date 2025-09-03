<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @keydown.esc="onClose"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60" @click="onClose"></div>

        <!-- Panel -->
        <div
          class="relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl bg-neutral-900 text-white ring-1 ring-white/10 shadow-xl p-4 sm:p-5"
        >
          <!-- Title -->
          <h3 class="text-sm sm:text-base font-semibold mb-2">
            {{ title }}
          </h3>

          <!-- Message -->
          <p class="text-xs sm:text-sm text-neutral-300 mb-4 sm:mb-5">
            {{ message }}
          </p>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-full text-xs sm:text-sm bg-neutral-700 hover:bg-neutral-600"
              @click="onClose"
            >
              {{ cancelText }}
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-full text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white"
              @click="onConfirm"
              autofocus
            >
              {{ confirmText }}
            </button>
          </div>

          <!-- Close (X) small -->
          <button
            type="button"
            class="absolute top-2 right-2 text-neutral-400 hover:text-white"
            aria-label="Close"
            @click="onClose"
          >
            ×
          </button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
interface Props {
  open: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Are you sure?',
  message: 'This action cannot be undone.',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()

const onConfirm = () => emit('confirm')
const onClose = () => emit('close')
</script>
