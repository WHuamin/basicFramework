import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';
// import AutoImport from 'unplugin-auto-import/vite';
// vueSetupExtend：扩展setup插件，支持在script标签中使用name属性
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export default function vitePlugins(enableMock: boolean) {
  return [
    vue(),
    vueSetupExtend(),
    // AutoImport({
    //   imports: [
    //     'vue',
    //     'vue-router',
    //     {
    //       vuex: ['useStore'],
    //     },
    //   ],
    // }),
    // AutoImport({
    //   include: [
    //     /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    //     /\.vue$/,
    //     /\.vue\?vue/, // .vue
    //     /\.md$/, // .md
    //   ],
    //   imports: [
    //     'vue',
    //     'vue-router',
    //     {
    //       vuex: ['useStore'],
    //     },
    //   ],
    //   // resolvers: [ElementPlusResolver()],
    //   dts: './auto-imports.d.ts',
    //   // eslint报错解决
    //   eslintrc: {
    //     // 此处为true运行后会生成.eslintrc-auto-import.json  auto-imports.d.ts文件
    //     enabled: true, // 此处第一次运行使用true,之后改为false
    //     filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
    //     globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    //   },
    // }),
    viteMockServe({
      mockPath: './src/mock/source', //mock文件路径，在根路径下创建一个mock文件
      localEnabled: enableMock, //mock开关
      prodEnabled: false, //生产环境下为false，这样就不会被打包到生产包中
      ignore: /^\_/, //忽略开始_路径
    }),
  ] as Plugin[];
}
