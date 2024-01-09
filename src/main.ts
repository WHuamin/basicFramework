import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import App from './App.vue';

const app = createApp(App);
app.use(store); // 注册pinia
app.use(router); // 注册路由
app.mount('#app'); // 挂载
