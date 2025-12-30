import request from '@/utils/request';

const API = {
  LOGIN_URL: '/admin/acl/index/login',
  USERINFO_URL: '/admin/acl/index/info',
  LOGOUT_URL: '/admin/acl/index/logout',
} as const;
//登录接口
export const reqLogin = (data: any) => request.post<any, any>(API.LOGIN_URL, data);
//获取用户信息
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL);
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);



// mock假接口
// import type { loginForm, loginResponseData, userResponseData } from './type';
// // 统一管理项目用户相关的接口
// const API = {
//   LOGIN_URL: '/user/login',
//   USERINFO_URL: '/user/info',
// } as const;
// // as const 断言
// // TypeScript 3.4 引入了 const 断言。当你使用 as const 时，TypeScript 会做以下事情：
// // 将对象的所有属性设置为 readonly（只读）。
// // 将数组转换为只读元组（如果适用）。
// // 将字符串、数字等字面量类型推断为具体的字面量类型，而不是一般的 string、number 等。

// // 暴露请求函数
// // 登录接口方法
// export const reqLogin = (data: loginForm) => request.post(API.LOGIN_URL, data) as Promise<loginResponseData>;

// // 获取用户信息接口方法
// export const reqUserInfo = () => request.get(API.USERINFO_URL) as Promise<userResponseData>;
