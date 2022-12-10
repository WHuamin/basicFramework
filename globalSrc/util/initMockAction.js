const Mock = require('mockjs')
const commonApi = process.env.VUE_APP_API_URL

// 设置拦截ajax请求的相应时间
// Mock.setup({
//   timeout: '200-600'
// })

/**
 * 测试 mock 数据
 * @param {Object} Action 请求实例
 * @param {Boolean} mock 是否启动mock数据 默认true
 * @param {Object} APIs 需要mock的api
 * @param {Object} mockData mock的api的模拟数据
 */
module.exports = ({ Action, mock = true }, { APIs, mockData }) => {
  if (!mock || !Object.keys(APIs).length) return false
  Object.keys(APIs).forEach((key) => {
    const { method, url } = APIs[key]
    Action[method](commonApi + url, (_, response) => {
      response.json(Mock.mock(mockData[`${method}|${url}`]))
    })
  })
}
