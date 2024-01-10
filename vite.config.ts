import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import path from 'path'; //这个path用到了依赖@types/node 【pnpm i @types/node -D】
import vitePlugins from './build/vite/plugins';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const enableMock = mode === 'development' && !!env.VITE_DEV_MOCK;

  return defineConfig({
    plugins: vitePlugins(enableMock),
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @代替src
        '#': path.resolve('./types'), // #代替types
      },
    },
    base: env.VITE_BASIC_SERVER,
    // 设置代理，以及解决跨域问题
    server: {
      host: '0.0.0.0', //解决 vite use--host to expose
      open: false, //默认启动项目打开页面
      port: 8090, //端口号
      proxy: {
        [env.VITE_PROXY_PREFIX]: {
          // 匹配请求路径，
          target: env.VITE_BASIC_SERVER,
          changeOrigin: true,
          secure: true, // 是否https接口
          ws: true, // 是否代理websockets
          // rewrite: (path) => path,
          rewrite: (path) => path.replace(/^\/api/, '/api'), // 看接口具体情况
        },
      },
    },
  });
};
