/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, post, apiUrl} from '@/apiconfig/index'

export const API_V1 = '/api/v1'
/**
 * 账号登录
 * @param params
 * @returns {*}
 */
export const login = (params) => post(`${apiUrl}${API_V1}/login`, params)

/**
 * 获取大厅彩票列表
 * @returns {*}
 */
export const findHallLotto = () => fetch(`${apiUrl}${API_V1}/hall/lotto/list`)
