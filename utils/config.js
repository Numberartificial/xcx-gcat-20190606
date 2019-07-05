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
  let url = `${API_PATH}/cats?status=${params.status}&current_page=${params.current_page}&page_size=${params.page_size}`
  return fetch(url, null, null, 'GET')
  
}

/**
 * 获取首页banner数据
 * @param params
 */
const get_banner_data = (params) => {
  let url = `${API_PATH}/cats/preview/`
  return fetch(url, null, null, 'GET')

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

/**
 * 发布宠物
 * @param params
 */
const submit_cats = (params) => {
  const url = `${API_PATH}/cats`
  return fetch(url, null, params, 'POST');
}

/**
 * 用户发布的宠物列表
 * @param params
 * user_id:用户union_id
 * status == 1.未被领养 2.已被领养
 * current_page
 * page_size=
 */
const cats_release_list = (params) => {
  const url = `${API_PATH}/users/cats/?user_id=${params.user_id}&status=${params.status}&current_page=${params.current_page}&page_size=${params.page_size}`
  return fetch(url, null, null, 'GET');
}

/**
 * 更新用户宠物状态
 * "cat_id": "b705870e-f113-48b1-9bcb-9268c0d03438",
	"status": 1 //1.重新发布 2.领养完成
 */
const update_release_status = (params) => {
  const url = `${API_PATH}/users/cats/update/`
  return fetch(url, null, params, 'PUT');
}

/**
 * 上传图片url
 *  */
const upload_photos_url  = `${API_PATH}/cats/images/upload/`

/**
 * 获取发布的微信号
 *  */
const get_wechat_id = (unionid) => {
  const url = `${API_PATH}/users/${unionid}`
  return fetch(url, null, null, 'GET');
}


module.exports={
  get_unionId: get_unionId,
  get_gcat_list: get_gcat_list,
  get_details: get_details,
  submit_actions: submit_actions,
  submit_cats: submit_cats,
  get_banner_data: get_banner_data,
  cats_release_list: cats_release_list,
  update_release_status: update_release_status,
  upload_photos_url: upload_photos_url,
  get_wechat_id: get_wechat_id
}