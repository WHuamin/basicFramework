const mockAction = require('../../globalSrc/util/initMockAction.js') // 对mock的封装
// 引入api
const TestAPIs = require('../api/test/api.js')

// 引入mock 数据
const TestMockData = require('./data/test.js')

// let configArray = []

// // 使用webpack的require.context()遍历所有mock文件
// const files = require.context('./modules', true, /\.js$/)
// files.keys().forEach((key, a, b) => {
//   console.log(key, a, b)
//   configArray = configArray.concat(files(key).default)
// })

// 注册所有的mock服务
// configArray.forEach((item) => {
//   for (const [path, target] of Object.entries(item)) {
//     const protocol = path.split('|')
//     console.log(protocol)
//     Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target)
//   }
// })

module.exports = function (app) { // 暴露一个函数，用于拦截请求时触发
  mockAction({ Action: app, mock: true }, { APIs: TestAPIs, mockData: TestMockData })
}
