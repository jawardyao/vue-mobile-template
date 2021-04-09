import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import { TokenHelper } from '@/utils/helper';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    meta: {
      title: '摩都物业管理系统',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登录',
      noLogin: true,
    },
  },
  {
    path: '/findpwd',
    name: 'findpwd',
    component: () => import('../views/findpwd/index.vue'),
    meta: {
      title: '修改密码',
      noLogin: true,
    },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/index'),
    meta: {
      title: '个人中心',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }

  // 处理jssdk签名，兼容history模式
  if (!store.state.global.landingUrl) {
    store.commit('global/setLandingUrl', document.URL);
  }

  const isLogin = !!TokenHelper.getToken();
  if (isLogin) {
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
    return;
  }

  // noLogin 无需登录
  if (!to.meta.noLogin) {
    const redirect = encodeURIComponent(to.fullPath);
    next({
      path: '/login',
      query: { redirect },
    });
    return;
  }

  next();
});

export default router;
