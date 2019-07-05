// pages/findCat/index.js
const app = getApp()
const API = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat_name: API.wechat_name,
    isSubmit:false,
    goCareCat: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad')
  

  },
  showGoCareCat:function() {
    this.setData({
      goCareCat: true
    })
  },
  hideGoCareCat: function() {
    this.setData({
      goCareCat: false
    })
  },
  _copyWachat:function(e) {
    const { wechat_name } = this.data
    wx.setClipboardData({
      data: wechat_name,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功'
            })
          },
          fail(res) {
            wx.showToast({
              title: '复制失败',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})