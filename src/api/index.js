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

/**
 * 获取主页信息
 * @returns {*}
 */
export const homeInit = () => fetch(`${apiUrl}${API_V1}/home/init`)

/**
 * 获取彩票具体信息
 * @param params
 * @returns {*}
 */
export const getBetPlayInfo = (params) => fetch(`${apiUrl}${API_V1}/bet/play_info`, params)

/**
 * 获取彩票当前期信息
 * @param params lotto_id
 * @returns {*}
 */
export const getCurrIssue = (params) => fetch(`${apiUrl}${API_V1}/lotto/curr_issue_info`, params)
