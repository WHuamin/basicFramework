import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.VUE_APP_API_URL

const { CancelToken, isCancel } = axios

const source = CancelToken.source()

// 网络错误
const NetworkErrorMessage = {
  400: '错误的请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误，未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求'
}

// 权限错误
const authErrorMessage = {
  10031: '登录失效，需要重新登录', // token 失效
  10032: '您太久没登录，请重新登录~', // token 过期
  10033: '账户未绑定角色，请联系管理员绑定角色',
  10034: '该用户未注册，请联系管理员注册用户',
  10035: 'code 无法获取对应第三方平台用户',
  10036: '该账户未关联员工，请联系管理员做关联',
  10037: '账号已无效',
  10038: '账号未找到'
}

// 处理请求表头
// const changeRequestHeader = (config) => {
//   config.xxxx = 'xxx'
//   return config
// }

// 配置权限 token
// const handleConfigureAuth = (config) => {
//   config.headers.token = 'test 123'
//   return config
// }

// 网络错误
const handleNetworkError = (errStatus) => {
  let errMessage = '未知错误'
  if (errStatus) {
    errMessage = NetworkErrorMessage[errStatus] || `连接错误 ${errStatus}`
  } else {
    errMessage = '无法连接到服务器！'
  }
  console.log(errMessage)
  Message.error({
    message: errMessage,
    center: true
  })
}

// 权限错误
const handleAuthError = (errno) => {
  if (authErrorMessage[errno]) {
    Message.error({
      message: authErrorMessage[errno],
      center: true
    })
    // 授权错误，登出账户
    // logout();
    return false
  }
  return true
}
// 处理常规错误
const handleGeneralError = (errno, errmsg) => {
  if (errno !== 200) {
    Message.error({
      message: errmsg,
      center: true
    })
    return false
  }
  return true
}

// 2. 利用axios对象的方法create,去创建一个axios实例
const instance = axios.create({
  // 基础路径
  // baseURL: process.env.VUE_APP_API_URL, // 所有请求的公共地址部分
  // timeout: 60000 // 请求超时时间,当请求时间超过6秒还未取得结果时,提示用户请求超时
})

/**
  * interceptors axios的拦截器对象
  * config 请求的所有信息
  * error 请求发生错误时的相关处理 抛出错误
  */
instance.interceptors.request.use(
  (config) => {
    // 响应成功的返回
    // config = changeRequestHeader(config)
    // config = handleConfigureAuth(config)

    config.cancelToken = source.token

    return config // 将配置完成的config对象返回出去 如果不返回 请求将不会进行
  },
  (error) => {
    console.log('请求拦截', error)
    // 响应失败的返回
    Promise.reject(error)
  }
)

/**
  * 响应拦截处理
  * 响应拦截器：包含两个函数（一个是成功返回的函数，一个是失败的返回的函数）
  */
instance.interceptors.response.use(
  ({ status, data }) => {
    // 一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
    if (status !== 200) return Promise.reject(data)
    handleAuthError(data.code)
    handleGeneralError(data.code, data.msg)
    return data.data
  },
  (err) => {
    // 服务器响应发生错误时的处理
    console.log('响应拦截 失败', err)

    if (isCancel(err)) {
      // 取消请求，打印日志
      source.cancel()// 取消请求，参数可选
      return new Promise(() => { }) // 中断promise链接
    } else {
      // 处理错误
      handleNetworkError(err?.response?.status)
      Promise.reject(err.response)
    }
  }
)

// 封装对应的方法（get与post传值不一致，封装后保持一致性）
export const axiosHttps = {
  // get: (url, params = null, config) => {
  //   return instance.get(url, {
  //     params,
  //     ...config
  //   })
  // },
  // post: (url, data = null, config) => {
  //   return instance.post(url, data, config)
  // },
  // delete: (url, params = null, config) => {
  //   return instance.delete(url, {
  //     params,
  //     ...config
  //   })
  // }
}

// 暴露实例导出
export default instance
