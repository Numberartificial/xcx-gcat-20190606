// pages/findCat/index.js
const app = getApp()
const API = require('../../utils/api.js');
import { submit_actions} from '../../utils/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo:false,
    findCatInfo: API.findCatInfo,
    wechat_name: API.wechat_name,
    isSubmit:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad')
  

  },

  submitWechat:function(e){

    let params={
      user_id: wx.getStorageSync('union_id'),
      wechat_id: e.detail.wechat_value
    }

    // console.log(11, params, '请求接口')

    submit_actions(params).then(res=>{
      if (res.errcode==0){
        wx.showToast({
          title: '提交成功',
        })
        this.setData({
          isSubmit: true
        })
        wx.setStorageSync('isSubmitFind', true)
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
      if (e.detail.wechat_value && e.detail.wechat_value!=''){
        self.submitWechat(e)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console d.log('onShow==isSubmitFind')
    if (wx.getStorageSync('isSubmitFind')){
      this.setData({
        isSubmit:true
      })
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})