const manageRoutes = [
  {
    path: '/home/manage',
    component: () => import('@/pages/manage/index.vue'),
    meta: {
      title: '管理页', // 页面标题
      auth: true, //需要登录权限
    },
  },
];

export default manageRoutes;
