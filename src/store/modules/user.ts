import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { reqLogin, reqUserInfo } from '@/api/user';
import type { loginForm, loginResponseData, userResponseData } from '@/api/user/type';
import { constantRoute } from '@/router/routes';

export const useUserStore = defineStore('user', () => {
  // 用户唯一标识token
  const token = ref(localStorage.getItem('TOKEN'));
  // 仓库存储生成菜单需要的数组
  const menuRoutes = reactive(constantRoute);

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

  const username = ref('');
  const avatar = ref('');
  // 用户基本信息
  // 获取用户信息
  async function userInfo() {
    const res: userResponseData = await reqUserInfo();
    if (res.code === 200) {
      username.value = res.data.checkUser.username;
      avatar.value = res.data.checkUser.avatar;
    } else {
    }
  }

  return { token, userLogin, menuRoutes, userInfo, username, avatar };
});
