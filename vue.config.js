const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    website: {
      // 入口文件，相当于单页面的 main.js
      entry: 'src/module/website/main.js',
      // 模板文件
      template: 'src/module/website/website.html',
      // 编译后 dist 目录下输出的文件，可以包含子目录
      filename: 'website.html'
    },
    platform: {
      // 入口文件，相当于单页面的 main.js
      entry: 'src/module/platform/main.js',
      // 模板文件
      template: 'src/module/platform/platform.html',
      // 编译后 dist 目录下输出的文件，可以包含子目录
      filename: 'platform.html'
    }
  }
})
