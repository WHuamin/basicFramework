import { requestsWithToken } from '@/api/request';
// 数据类型
import * as UserTypes from './types';
// 接口url
import * as UserAPI from './url';

// 用户请求接口
export class UserRequests {
  // 登录接口
  userList(data: UserTypes.ILoginParams) {
    return requestsWithToken.get<UserTypes.ILoginData>({
      url: UserAPI.LoginAPI.login,
      data,
      showLoading: true,
    });
  }
}

export default new UserRequests();
