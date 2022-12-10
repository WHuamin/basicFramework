import requests from '@/util/request'
const APIs = require('./api')

// 单个 api 导出
export function singleRequest (name, data) {
  return requests({ ...APIs[name], data })
}

// 本模块所有 api 导出
export default (() => {
  const allRequest = {}
  Object.keys(APIs).forEach((key) => {
    allRequest[key] = (data) => requests({ ...APIs[key], data })
  })
  return allRequest
})()
