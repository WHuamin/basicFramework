import BasicRequest from '@/utils/axios';
import type { HRequestConfig } from '#/axios';
// 数据类型
import * as CommonTypes from './types';
// 接口url
import * as CommonAPI from './url';

// 用户请求接口
class UserRequests extends BasicRequest {
  constructor(config: HRequestConfig) {
    super(config);
  }

  // 登录接口
  login(data: CommonTypes.ILoginParams) {
    return this.post<CommonTypes.ILoginData>({
      url: CommonAPI.LoginAPI.login,
      data,
      showLoading: true,
    });
  }

  // 登录接口
  logout(data: CommonTypes.ILogoutParams) {
    return this.post<CommonTypes.ILogoutData>({
      url: CommonAPI.LoginAPI.logout,
      data,
      showLoading: true,
    });
  }
}

const userApis = new UserRequests({
  baseURL: '',
  timeout: 60000,
});

export default userApis;
