//app.js
import { get_unionId } from './utils/config'
const API = require('./utils/api.js');
App({
  onLaunch: function(options) {
    
  },
  globalData: {
    userInfo: null
  },
  // 全局获取用户信息
  getUserInfoAll: function(res, callback) {
    let _this = this;
    console.log(res, '---获取用户信息---');
    if (res.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '用户授权',
        content: '本小程序需用户授权，请重新点击按钮授权。',
        mask: true,
        confirmColor: '#2ABE76',
        success: function(res) {}
      })
    } else if (res.detail.errMsg == 'getUserInfo:ok') {
      let userInfo = res.detail.userInfo;
      _this.globalData.userInfo = userInfo;
      wx.setStorageSync('user_info', userInfo); //存储用户信息
      // _this.wxLogin(res.detail.encryptedData, res.detail.iv);
      let encryptedData = res.detail.encryptedData;
      let iv = res.detail.iv
      //callback 必须在拿到unionid之后才返回
      wx.login({
        success: function (res) {
          // console.log(res, 'wx_login_success')
          if (res.code) {
            let params = {
              app_id: API.APP_ID,
              code: res.code,
              encrypted_data: encryptedData,
              iv: iv
            };
            // console.log(params, 'get_unionId==params')
            get_unionId(params).then(res => {
              "use strict";
              // console.log(res,'get_unionId_success')
              if (res.errcode == 0 ) {
                //存储unionid等
                let unionId = res.data.user_id;
                wx.setStorageSync('union_id', unionId)
                callback({
                  userInfo: userInfo,
                  hasUserInfo: true,
                });
              } else {
                console.log("获取unionid报错", res)
              }
            }).catch(req=>{
              console.log('接口调取失败--',req)
            })
          }
        },
        fail: function (req) {
          console.log('fail--',req)
        }
      })
      
    }
  }


})