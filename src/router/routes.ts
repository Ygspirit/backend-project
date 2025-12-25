import type { RouteRecordRaw } from 'vue-router';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: 'login',
      hidden: true,
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '首页',
      menuHidden: false,
    },
  },

  {
    path: '/test',
    component: () => import('@/layout/index.vue'),
    name: 'test',
    meta: {
      title: '测试',
      menuHidden: false,
    },
    children: [
      {
        path: '/test1',
        component: () => import('@/layout/index.vue'),
        name: 'test1',
        meta: {
          title: '测试孩子',
          hidden: false,
        },
      },
      {
        path: '/test2',
        component: () => import('@/layout/index.vue'),
        name: 'test12',
        meta: {
          title: '测试孩子2',
          hidden: false,
        },
      },
    ],
  },

  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: 'any',
      hidden: true,
    },
  },
];
