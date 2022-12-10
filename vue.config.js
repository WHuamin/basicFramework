'use strict'
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
// const mockConfig = require('./mock')
const defaultWebsiteConfig = require('./globalSrc/config/website.js')
const pageName = defaultWebsiteConfig.title || '平台管理'

// console.log('这是什么', mockConfig)

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    website: {
      // page 的入口
      entry: './website/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 index.html 的输出
      filename: 'website/index.html',
      // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %</title>
      title: '首页'
    },
    platform: {
      entry: './platform/main.js',
      template: 'public/platform.html',
      filename: 'platform/index.html',
      title: '平台管理系统'
    }
  },

  // css相关选项
  css: {
    // 为预处理器 loader 传递自定义选项
    loaderOptions: {
      scss: {
        additionalData:
          '@import "~@/css/variables.scss";@import "~@/css/reset.scss";@import "~@/css/mixins.scss";'
      }
    }
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: pageName,
    resolve: {
      alias: {
        '@': resolve('globalSrc'),
        '@platform': resolve('platform')
      }
    }
  },

  devServer: {
    proxy: {
      [process.env.VUE_APP_API_URL]: {
        target: process.env.VUE_APP_BASE_URL, // 请求后台的地址
        ws: true, // 是否要开启代理
        changOrigin: true, // 允许跨域
        // 重写路径 api代替了目标路径
        pathRewrite: {
          [`^${process.env.VUE_APP_API_URL}`]: ''
        }
      }
    },
    // before 报错原因是 webpack4+ 版本已废弃 before，更换使用最新方法 onBeforeSetupMiddleware（webpack4+）、setupMiddlewares（webpack5+） 即可。
    // before: app => { console.log( app) }
    onBeforeSetupMiddleware: (devServer) => {
      if (!devServer) throw new Error('webpack-dev-server is not defined')
      const { NODE_ENV, VUE_APP_IS_MOCK } = process.env

      // 非生产环境并且启动了mock
      if (NODE_ENV !== 'production' && VUE_APP_IS_MOCK) {
        const mockConfig = require('./platform/mock/index.js')
        mockConfig(devServer.app)
      }
    }
    // onBeforeSetupMiddleware: require('./platform/mock/index.js')
  }
})
