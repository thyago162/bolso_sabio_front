import './assets/main.css'
import './assets/scss/main.scss'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './plugins/vuetify'

import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(ToastPlugin);

app.mount('#app')
