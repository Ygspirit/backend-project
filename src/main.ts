import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'; //配置国际化
app.use(ElementPlus, {
  locale: zhCn,
});

// vite-plugin-svg-icons
import 'virtual:svg-icons-register';

// 全局组件
import globalComponent from '@/components/index.ts';
app.use(globalComponent);

// 全局样式
import '@/styles/index.scss';

// vue-router
import router from '@/router/index.ts';
app.use(router);

// 路由鉴权
import '@/permission.ts';

// pinia
import pinia from '@/store/index.ts';
app.use(pinia);

app.mount('#app');
