/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
import {fetch, post} from '@/apiconfig/index'

export const API_V1 = '/api/v1'

// let apiUrl = localStorage.getItem('API_URL')
let apiUrl = ''
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

/**
 * 下单
 * @param params lotto_id
 * @returns {*}
 */
export const betConfirm = (params) => post(`${apiUrl}${API_V1}/lotto/bet`, params)

/**
 * 获取验证码
 * @param params
 * @returns {*}
 */
export const getCaptcha = (params) => fetch(`${apiUrl}${API_V1}/captcha`, params)

/**
 * 获取验证码地址
 * @param params
 * @returns {*}
 */
export const getCaptchaUrl = (params) => `${apiUrl}${API_V1}/captcha`

/**
 * 注册
 * @param params
 * @returns {*}
 */
export const register1 = (params) => post(`${apiUrl}${API_V1}/register`, params)

/**
 * 个人信息
 * @param params
 * @returns {*}
 */
export const infos = (params) => fetch(`${apiUrl}${API_V1}/infos`, params)

/**
 * 游客登录
 * @param params
 * @returns {*}
 */
export const guestLogin = (params) => post(`${apiUrl}${API_V1}/login/guest`, params)

/**
 * 注单查询
 * @param params
 * @returns {*}
 */
export const findLottoOrder = (params) => fetch(`${apiUrl}${API_V1}/lotto/order`, params)
