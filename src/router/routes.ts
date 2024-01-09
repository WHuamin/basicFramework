import { tokenAuth } from './authConfig';
const routes = [
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'), //路由懒加载
  },
  {
    path: '/register/:plan',
    component: () => import('@/pages/register/index.vue'),
  },
  {
    path: '/home',
    name: 'Home', //增加name，动态路由通过name挂载到该子路由下
    component: () => import('@/pages/home/index.vue'),
    redirect: '/home/user', // 重定向 访问/home时，会重定向到/home/user
    children: [
      {
        path: '/home/user',
        component: () => import('@/pages/user/index.vue'),
        beforeEnter: tokenAuth, // 路由独享守卫
      },
      //   {
      //     path: '/home/manage',
      //     component: () => import('@/pages/manage/index.vue'),
      //     meta: {
      //       title: '管理页', // 页面标题
      //       auth: true, //需要登录权限
      //     },
      //   },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/notFound/index.vue'),
  },
];

//将/home/manage拆出来
export const manageRoute = {
  path: '/home/manage',
  component: () => import('@/pages/manage/index.vue'),
  meta: {
    title: '管理页', // 页面标题
    auth: true, //需要登录权限
  },
};

export default routes;
