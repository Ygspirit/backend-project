import { defineStore } from 'pinia';
import { routes } from '@/router/routes';
export const useMenuStore = defineStore('menu', () => {
  const menuList = routes;
  return { menuList };
});
