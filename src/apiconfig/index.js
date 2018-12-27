/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
import {API_URL} from '../../static/js/conf'

/**
* 定义请求常量
* TIME_OUT、ERR_OK
*/
export const TIME_OUT = 1000;    // 请求超时时间
export const ERR_OK = true;      // 请求成功返回状态，字段和后台统一
export const baseUrl = process.env.BASE_URL   // 引入全局url，定义在全局变量process.env中
// export const apiUrl = process.env.API_URL   // 引入全局url，定义在全局变量process.env中
export const apiUrl = API_URL   // 引入全局url，定义在全局变量process.env中

// 请求超时时间
axios.defaults.timeout = TIME_OUT
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 封装请求拦截
axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Authorization'] = localStorage.getItem('SID')
    if(config.method === 'post') {
      config.data = qs.stringify( {
        ...config.data
      })
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
)
// 封装响应拦截，判断token是否过期
axios.interceptors.response.use(
  response => {
    let {data} = response
    if (data.message === 'token failure!') {    // 如果后台返回的错误标识为token过期，则重新登录
      localStorage.removeItem('token')          // token过期，移除token
      // 进行重新登录操作
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装post请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export function post(url, params = {}) {
  return axios({
    url: url,
    method: "post",
    data: params
  })
}

/**
 * 封装get请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export function fetch(url, params = {}) {
  return axios({
    url: url,
    method: "get",
    params: params
  })
}
