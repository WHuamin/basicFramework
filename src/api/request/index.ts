import type { RequestConfig } from '#/axios';
import BasicRequest from './axios';

// 测试axios封装请求接口 - 携带token
class RequestWithToken extends BasicRequest {
  constructor(config: RequestConfig) {
    super(config);
  }
}

// 公共请求接口
export const basicRequest = new BasicRequest({
  baseURL: import.meta.env.VITE_DEV_SERVER,
  timeout: 60000,
});

// 携带token
export const requestsWithToken = new RequestWithToken({
  baseURL: import.meta.env.VITE_DEV_TEST_SERVER,
  timeout: 60000,
  tokenPrefix: 'abc',
});
