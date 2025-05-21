import './assets/styles/App.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import FloatingVue from 'floating-vue'


const app = createApp(App)

app.use(FloatingVue)

app.use(createPinia())

app.mount('#app')
