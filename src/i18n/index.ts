import { createI18n } from 'vue-i18n'

// JSON dosyalarını manuel olarak import et
import en from '@/locales/en.json'
import tr from '@/locales/tr.json'

// Çeviri mesajları için tip tanımı
type MessageSchema = {
  [key: string]: string | MessageSchema
}

const messages: Record<string, MessageSchema> = {
  en,
  tr,
}

// Debug için console'a yazdır
console.log('Loaded messages:', messages)

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
