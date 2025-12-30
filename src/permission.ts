// 路由鉴权：项目中路由能不能被访问的权限的设置
import router from '@/router';
import setting from './setting';
import nprogress from 'nprogress'; // 引入进度条插件
import 'nprogress/nprogress.css'; // 引入进度条样式
nprogress.configure({ showSpinner: false });
// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import { useUserStore } from '@/store/modules/user';
import pinia from './store';
const userStore = useUserStore(pinia);

// 全局守卫：项目中任意路由切换时都会触发的钩子函数
// 全局前置守卫:访问某一个路由之前的守卫（触发的钩子函数）
router.beforeEach(async (to, from, next) => {
  // to: 要去的路由信息对象
  // from: 来自哪个路由的信息对象
  // next: 路由的放行函数
  document.title = `${setting.title} - ${to.meta.title}`; // 设置网页标题
  nprogress.start(); // 开启进度条
  // 判断用户是否登录成功（有无token）
  let token = userStore.token;
  let username = userStore.username;
  if (token) {
    // 用户登录成功
    if (to.path === '/login') {
      // 去登录页
      next({ path: '/' }); // 跳转首页
    } else {
      if (username) {
        next(); // 放行
      } else {
        try {
          await userStore.userInfo();
          next();
        } catch (error) {
          // token国企：获取不到用户信息
          // 用户手动修改本地存储的token
          // 退出登录-->用户相关的数据清空
          userStore.userLogout();
          next({ path: '/login', query: { redirect: to.path } });
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path === '/login') {
      // 去登录页
      next();
    } else {
      next({ path: '/login', query: { redirect: to.path } }); // 跳转登录页
    }
  }
  next();
});

// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.done(); // 结束进度条
});

// 第一个问题：任意路由切换实现进度条业务（进度条插件progress）
// 第二个问题：路由鉴权（路由组件访问权限的设置）
// 全部路由组件：登录、404、任意路由、首页、数据大屏、权限管理【三个子路由】、商品管理【四个子路由】

// 用户未登录：可以访问登录login，其余六个路由不能访问（指向login）
// 用户登录成功：不能访问login（指向首页），其余的路由可以访问
