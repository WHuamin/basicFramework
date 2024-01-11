import type { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// 引入 common.ts
import CommonRouter from './modules/common';
import ManageRouter from './modules/manage';
import { useUserStore } from '@/store/user';

export const publicRoutes: Array<RouteRecordRaw> = [...CommonRouter, ...ManageRouter];

const router = createRouter({
  history: createWebHistory(), //可传参数，配置base路径，例如'/app'
  routes: publicRoutes,
});

router.beforeEach((to, from, next) => {
  // ✅ 这样做是可行的，因为路由器是在其被安装之后开始导航的，
  // 而此时 Pinia 也已经被安装。
  const store = useUserStore();
  if (!store.token && !!to.meta.auth) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    };
  } else {
    next();
  }
});

export default router;

/* 初始化路由表 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

/* 导出 setupRouter */
export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
