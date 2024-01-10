import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 定义接口
export interface HRequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (error: any) => any;
  // 响应拦截
  responeseInterceptor?: (res: T) => T;
  responeseInterceptorCatch?: (error: any) => any;
}

export interface HRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HRequestInterceptors<T>;
  //   是否展示请求加载状态
  showLoading?: boolean;
}

export interface RequestConfig extends AxiosRequestConfig {
  // token 前缀
  tokenPrefix?: string;
}

export interface BasicAxiosRequest extends AxiosRequestConfig {
  // token 前缀
  tokenPrefix?: string;
  // 是否展示请求加载状态
  showLoading?: boolean;
}

export interface BasicInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  // token 前缀
  tokenPrefix?: string;
  // token - 完整的token
  token?: string;
}
