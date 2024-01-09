import { useUserStore } from '@/store/user';
// 页面访问 token 权限
export const tokenAuth = () => {
  const store = useUserStore();
  //   console.log('路由独享守卫 -- 页面访问 token 权限', store.token);
  if (!store.token) {
    // 未登录,重定向到登录页面
    return '/login';
  }
};
