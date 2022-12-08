// 自动注册全局组件
import Vue from 'vue'
/*
  require.context()函数的作用: 匹配一个文件夹下所有符合规则的文件
  require.context()函数接收三个参数:
  1.directory{String} - 文件夹路径
  2.useSubdirectories{Boolean} - 是否遍历文件的子目录
  3.regExp{RegExp} - 匹配文件的正则

  require.context()函数执行后返回一个函数,并且这个函数有三个属性:
  1.id{String} - 执行环境的id,返回的是一个字符串
  2.keys{Function} - 返回匹配成功的所有文件的相对路径组成的数组
  3.resolve{Fuction} - 接受一个参数request,request为文件夹下面匹配成功文件的相对路径,返回这个匹配文件相对于整个工程的相对路径
*/

// 处理首字母大写 abc => Abc
function changeStr (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const files = require.context('.', true, /\Basic.*?\.vue/)

files.keys().forEach((fileName) => {
  // files作为一个函数,也接受一个参数request,这个和resolve方法的request参数是一样的,即匹配文件的相对路径,而files函数返回的是一个模块,这个模块才是我们想要的
  const module = files(fileName)
  const compName = changeStr(
    // 剥去文件名开头的 `./` 和结尾的扩展名 eg: ./base/basic-header.vue -> basicHeader
    fileName.replace(/^\.\/(.*\/)?(.*)\.\w+$/, '$2')
  )
  Vue.component(compName, module.default || module) // 动态注册该目录下所有的.vue文件
})
