import { createApp } from 'vue'
import App from './App.vue'
//@ts-ignore
import print from 'vue3-print-nb'

const app = createApp(App)
app.use(print)
app.mount('#app')
