import path from 'path'; //这个path用到了依赖@types/node 【pnpm i @types/node -D】

export const pathResolve = (dir) => {
  // return path.resolve(__dirname, '.', dir);
  return path.resolve(dir);
};

export const alias = {
  '@': pathResolve('./src'), // @代替src
  '#': pathResolve('./types'), // #代替types
};

export function createProxy(env) {
  return {
    [env.VITE_BASIC_PROXY_PREFIX]: {
      // 匹配请求路径，
      target: env.VITE_BASIC_SERVER,
      changeOrigin: true,
      secure: true, // 是否https接口
      ws: true, // 是否代理websockets
      // rewrite: (path) => path,
      rewrite: (path) => path.replace(/^\/api/, '/api'), // 看接口具体情况
    },

    [env.VITE_TEST_PROXY_PREFIX]: {
      // 匹配请求路径，
      target: env.VITE_TEST_SERVER,
      changeOrigin: true,
      secure: true, // 是否https接口
      ws: true, // 是否代理websockets
      // rewrite: (path) => path,
      rewrite: (path) => path.replace(/^\/api/, '/api'), // 看接口具体情况
    },
  };
}
