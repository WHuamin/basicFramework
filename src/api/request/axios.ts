import axios from 'axios';
import type { AxiosInstance } from 'axios';
// import type { HRequestInterceptors, HRequestConfig } from '#/axios';
import type { HRequestConfig, BasicAxiosRequest, BasicInternalAxiosRequestConfig } from '#/axios';

// 请求加载显示状态 - 默认
const DEFAULT_LOADING = false;
// const TOKEM_KEY: string = 'token';

class BasicRequest {
  // 类型
  instance: AxiosInstance;
  //   interceptors?: HRequestInterceptors; // 如果要自定义拦截器， 外面继承 BasicRequest 类
  showLoading: boolean;

  constructor(config: BasicAxiosRequest) {
    // 创建请求
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    // 全局统一拦截 - 请求
    this.instance.interceptors.request.use(
      (config: BasicInternalAxiosRequestConfig) => {
        if (config?.tokenPrefix) {
          //   config[TOKEM_KEY] = `${config.tokenPrefix} 123`;
          config.token = `${config.tokenPrefix} 123`;
        }

        return config;
      },
      (err) => {
        return err;
      },
    );

    // 全局统一拦截 - 响应
    this.instance.interceptors.response.use(
      (res) => {
        if (res.status == 200) {
          return res.data;
        } else {
          return Promise.reject(res);
        }
      },
      (err) => {
        if (['ERR_NETWORK', 'ERR_BAD_REQUEST'].includes(err.code)) {
          return Promise.reject({
            code: err.code,
            message: err.message,
          });
        } else {
          return Promise.reject(err);
        }
      },
    );
  }

  request<T>(config: HRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      if (config.showLoading) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          this.showLoading = DEFAULT_LOADING;
        });
    });
  }

  get<T>(config: HRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T>(config: HRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  put<T>(config: HRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' });
  }

  delete<T>(config: HRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}

export default BasicRequest;
