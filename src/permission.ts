// 路由鉴权：项目中路由能不能被访问的权限的设置
import router from '@/router';
import nprogress from 'nprogress'; // 引入进度条插件
import 'nprogress/nprogress.css'; // 引入进度条样式

// 全局守卫：项目中任意路由切换时都会触发的钩子函数
// 全局前置守卫:访问某一个路由之前的守卫（触发的钩子函数）
router.beforeEach((to, from, next) => {
  // to: 要去的路由信息对象
  // from: 来自哪个路由的信息对象
  // next: 路由的放行函数
  nprogress.start(); // 开启进度条
  next();
});

// 全局后置守卫
router.afterEach((to, from) => {
    nprogress.done(); // 结束进度条
});

// 第一个问题：任意路由切换实现进度条业务（进度条插件progress）
