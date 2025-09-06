import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import tr from '@/locales/tr.json'

type MessageSchema = {
  [key: string]: string | MessageSchema
}

const messages: Record<string, MessageSchema> = {
  en,
  tr,
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export const t = i18n.global.t
