import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import 'quasar/dist/quasar.sass';

const app = createApp(App).use(Quasar, quasarUserOptions);

app.use(createPinia());
app.use(router);

app.mount('#app');
