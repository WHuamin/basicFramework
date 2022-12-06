# 用于存放多页面相关文件

```
在src目录下新建module文件夹，用于存放多页面相关文件
一个页面需要有最少三个文件构成，.html、.js、.vue，所以要创建一个最终的页面。
一般会根据页面的名称来命名。比如 website：website.html、main.js、App.vue。
.html、.js、.vue 的内容参照项目原本的App.vue、main.js、public/index.html
在 vue.config.js 文件中配置多页面应用

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

启动应用：npm run serve
访问： http://192.168.0.17:8080/website
```
