import axios from 'axios'

/**
 * response interceptor
 */
axios.interceptors.response.use(
  // my statusMsgData can reach
  axiosResponse => {
    const response = axiosResponse.data // 这里的response就是我们自己封装的StatusData了
    const status = parseInt(response.status)
    // 成功查询到数据/成功完成增删改且不需要提示
    // 成功完成增删改且需要提示
    if (status === 20000 || status === 20002) {
      return response.data
    }
    if (status === 40001) {
      return Promise.reject(new Error(response.msg || 'Error'))
    }
  },
  // my statusMsgData can not reach
  (error) => {
    return Promise.reject(error)
  },
)
