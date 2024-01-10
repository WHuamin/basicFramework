import { basicRequest, requestsWithToken } from '@/api/request';
// 数据类型
import * as CommonTypes from './types';
// 接口url
import * as CommonAPI from './url';

// 公共请求接口
export class basicRequests {
  // 登录接口
  login(data: CommonTypes.ILoginParams) {
    return basicRequest.get<CommonTypes.ILoginData>({
      url: CommonAPI.LoginAPI.login,
      data,
      showLoading: true,
    });
  }

  // 登录接口
  // logout1(data: CommonTypes.ILogoutParams) {
  //   return basicRequest
  //     .get<CommonTypes.ILogoutData>({
  //       url: CommonAPI.LoginAPI.logout,
  //       data,
  //       showLoading: true,
  //     })
  //     .then((res) => {
  //       return res;
  //     });
  // }

  logout(data: CommonTypes.ILogoutParams) {
    return requestsWithToken
      .get<CommonTypes.ILogoutData>({
        url: CommonAPI.LoginAPI.logout,
        data,
        showLoading: true,
      })
      .then((res) => {
        return res;
      });
  }
}

export default new basicRequests();
