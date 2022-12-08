'use strict'
const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const defaultWebsiteConfig = require('./globalSrc/config/website.js')
const pageName = defaultWebsiteConfig.title || '平台管理'

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
  }
})
