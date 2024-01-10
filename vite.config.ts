import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import vitePlugins from './build/vite/plugins';
import { alias, createProxy } from './build/vite/config';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const enableMock = mode === 'development' && !!env.VITE_BASIC_ENABLE_MOCK;
  const distName = mode + 'dist';

  return defineConfig({
    plugins: vitePlugins(enableMock),
    //这里进行配置别名
    resolve: {
      alias,
    },
    base: env.VITE_BASIC_SERVER,
    // 设置代理，以及解决跨域问题
    server: {
      host: '0.0.0.0', //解决 vite use--host to expose
      open: false, //默认启动项目打开页面
      port: 8090, //端口号
      proxy: createProxy(env),
    },
    //****这里进行设置文件名****
    build: {
      outDir: distName,
    },
  });
};
