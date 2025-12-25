import { defineStore } from 'pinia';
import { ref } from 'vue';
import { reqLogin } from '@/api/user';
import type { loginForm, loginResponseData } from '@/api/user/type';

export const useUserStore = defineStore('user', () => {
  // 用户唯一标识token
  const token = ref(localStorage.getItem('TOKEN'));

  // 用户登录
  async function userLogin(loginData: loginForm) {
    const res: loginResponseData = await reqLogin(loginData);
    console.log(res);
    if (res.code === 200) {
      token.value = res.data.token as string;
      localStorage.setItem('TOKEN', res.data.token as string);
      return 'ok';
    } else {
      return Promise.reject(new Error(res.data.message));
    }
  }
  return { token, userLogin };
});
