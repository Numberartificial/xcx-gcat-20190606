const API = require('./api');
import { fetch } from './wxRequest';//接口请求
import { getAccessToken } from './AuthProvider';//获取 token 

const API_PATH = API.API_PATH

//接口调用
// wxRequest(url, token, data, type) 
/**
 * 获取unionid 非鉴权
 * @param params
 */
const get_unionId = (params) => {
  let url = `${API_PATH}/users`
  return fetch(url, null, params, 'PUT');
}
/**
 * 获取宠物列表
 * @param params
 */
const get_gcat_list = (params) => {
  let url = `${API_PATH}/cats?status=&current_page=${params.current_page}&page_size=${params.page_size}`
  return fetch(url, null, null, 'GET');
  
}
/**
 * 获取宠物详情
 * @param params
 */
const get_details = (id) => {
  const url = `${API_PATH}/cats/${id}`
  return fetch(url , null, null, 'GET');
}

/**
 * 提交微信号
 * @param params
 * user_id:用户union_id
 * wechat_id:用户微信号
 */
const submit_actions = (params) => {
  const url = `${API_PATH}/applications`
  return fetch(url, null, params, 'POST');
}

module.exports={
  get_unionId: get_unionId,
  get_gcat_list: get_gcat_list,
  get_details: get_details,
  submit_actions: submit_actions
}