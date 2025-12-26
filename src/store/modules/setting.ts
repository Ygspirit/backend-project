// 小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useLayoutSettingStore = defineStore('layoutSettingStore', () => {
  const folded = ref(false);
  return { folded };
});
