import request from '@/utils/request';
import type { loginForm, loginResponseData, userResponseData } from './type';

// 统一管理项目用户相关的接口
const API = {
  LOGIN_URL: '/user/login',
  USERINFO_URL: '/user/info',
} as const;

// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: loginForm) => request.post(API.LOGIN_URL, data) as Promise<loginResponseData>;

// 获取用户信息接口方法
export const reqUserInfo = () => request.get(API.USERINFO_URL) as Promise<userResponseData>;
