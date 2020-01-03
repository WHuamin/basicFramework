module.exports = {
  pages: {
    home: {
      //入口文件
      entry: 'src/pages/home/home.js',
      //应用的模板
      //template: 'public/home.html',
      //编译后dist目录中输出的文件名，非必须，省略时默认与模块名一致
      //filename: 'home.html'
    },
    //只有entry属性是，直接用字符串标识模块入口，其他默认与模块名一致
    classify: 'src/pages/classify/classify.js'
  }
}