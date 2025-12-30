import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
// 引入登录与获取用户信息的接口函数
import { reqLogin, reqUserInfo } from '@/api/user';
// 引入相关类型
import type { loginForm, loginResponseData, userResponseData } from '@/api/user/type';
// 引入操作本地存储的工具函数
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from '@/utils/token';
// 引入常量路由
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
  // 获取用户信息
  async function userInfo() {
    const res: userResponseData = await reqUserInfo();
    if (res.code === 200) {
      username.value = res.data.checkUser.username;
      avatar.value = res.data.checkUser.avatar;
      return 'ok';
    } else {
      return Promise.reject('获取用户信息失败！');
    }
  }

  function userLogout() {
    token.value = '';
    localStorage.removeItem('TOKEN');
    username.value = '';
    avatar.value = '';
  }

  return { token, userLogin, menuRoutes, userInfo, username, avatar,userLogout };
});
