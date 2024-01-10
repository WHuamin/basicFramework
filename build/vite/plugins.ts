import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';

export default function vitePlugins(enableMock: boolean) {
  return [
    vue(),
    viteMockServe({
      mockPath: './src/mock/source', //mock文件路径，在根路径下创建一个mock文件
      localEnabled: enableMock, //mock开关
      prodEnabled: false, //生产环境下为false，这样就不会被打包到生产包中
      ignore: /^\_/, //忽略开始_路径
    }),
  ] as Plugin[];
}
