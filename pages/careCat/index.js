// pages/careCat/index.js
const app = getApp()
const API = require('../../utils/api.js');
import { submit_actions } from '../../utils/config.js'

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

  },

  submitWechat: function (e) {
    let params = {
      user_id: wx.getStorageSync('union_id'),
      wechat_id: e.detail.wechat_value
    }

    console.log(11, params, '请求接口')
    this.setData({
      isSubmit: true
    })
    // submit_actions(params).then(res=>{
    //   if(res.data==200){
    //     wx.showToast({
    //       title: '提交成功',
    //     })
    //   }else{
    //     wx.showToast({
    //       title: '提交失败',
    //       icon:'none'
    //     })
    //   }
    // })



  },
  //小程序授权 获取用户信息
  getUserInfo: function (e) {
    console.log(e, 'getUserInfo')
    this.setData({
      hasUserInfo: true
    })
    // var self = this;
    // app.getUserInfoAll(e, res => {
    //   self.setData({
    //     hasUserInfo: res.hasUserInfo,
    //     userInfo: res.userInfo
    //   })
    //   // self.submitWechat()
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})