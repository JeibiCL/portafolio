import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')


const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');