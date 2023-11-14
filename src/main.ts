import { createApp } from 'vue'
import { Can, abilitiesPlugin } from '@casl/vue';

import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
