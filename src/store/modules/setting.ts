// 小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useLayoutSettingStore = defineStore('layoutSettingStore', () => {
  const folded = ref(false); //用户控制菜单是否折叠
  const refsh = ref(false); //控制刷新效果
  return { folded, refsh };
});
