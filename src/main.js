import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';
// Css
import './assets/tailwind.css';
import './assets/main.css';

const app = createApp(App);

// Vuex
app.use(store);

// Router
app.use(router);

// Plugins
app.use(VeeValidatePlugin);

// App
app.mount('#app');