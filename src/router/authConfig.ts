// 页面访问 token 权限
export const tokenAuth = () => {
  //   console.log('路由独享守卫 -- 页面访问 token 权限');
  if (!localStorage.getItem('token')) {
    // 未登录,重定向到登录页面
    return '/login';
  }
};
