import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; //这个path用到了依赖@types/node 【pnpm i @types/node -D】

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [vue()],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @代替src
        '#': path.resolve('./types'), // #代替types
      },
    },
    base: env.VITE_DEV_SERVER,
    // 设置代理，以及解决跨域问题
    server: {
      host: '0.0.0.0', //解决 vite use--host to expose
      open: true, //默认启动项目打开页面
      port: 8090, //端口号
      proxy: {
        [env.VITE_DEV_PROXY_PREFIX]: {
          // 匹配请求路径，
          target: env.VITE_DEV_SERVER,
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
