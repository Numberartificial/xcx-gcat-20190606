// pages/careCat/index.js
const app = getApp()
const API = require('../../utils/api.js');
import { submit_cats } from '../../utils/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    careCatInfo: API.careCatInfo,
    hasUserInfo: false,
    wechat_name: API.wechat_name,
    isSubmit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('isSubmitCare')) {
      this.setData({
        isSubmit: true
      })
    }
  },

  submitWechat: function (e) {
    let params = {
      user_id: wx.getStorageSync('union_id'),
      wechat_id: e.detail.wechat_value
    }

    // console.log(12, params, '请求接口')
    
    submit_cats(params).then(res=>{
      if (res.errcode==0){
        wx.showToast({
          title: '提交成功',
        })
        this.setData({
          isSubmit: true
        })
        wx.setStorageSync('isSubmitCare', true)
      }else{
        wx.showToast({
          title: '提交失败',
          icon:'none'
        })
      }
      
    })
  },
  //小程序授权 获取用户信息
  getUserInfo: function (e) {
    var self = this;
    app.getUserInfoAll(e, res => {
      self.setData({
        hasUserInfo: res.hasUserInfo,
        userInfo: res.userInfo
      })
      if (e.detail.wechat_value && e.detail.wechat_value != '') {
        self.submitWechat(e)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})