import { type App, type Component } from 'vue';

// 引入项目中全部的全局组件
import SvgIcon from '@/components/SvgIcon/index.vue';

// 引入Element Plus全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 全局对象
const allGlobalComponents: Record<string, Component> = { SvgIcon };

// 向外暴露插件对象
export default {
  // 在install方法
  install(app: App) {
    // 注册项目全部的全局组件
    Object.entries(allGlobalComponents).forEach(([key, component]) => {
      app.component(key, component);
    });
    // 注册Element Plus全部图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
