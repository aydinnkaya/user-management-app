import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import { applyGlobalFixes } from './utils/globalSetup'
import 'virtual:svg-icons-register'
import { i18n } from './i18n'

applyGlobalFixes()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
