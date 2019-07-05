// pages/option/index.js
const API = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechatName: API.wechat_name
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  copyWachat: function () {
    let self = this
    const {
      wechatName
    } = this.data

    wx.setClipboardData({
      data: wechatName,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功',
              duration: 1000
            })

          },
          fail(res) {
            wx.showToast({
              title: '复制失败',
              icon: 'none',
              duration: 1000
            })
          },
          complete(res) {
            setTimeout(() => {
              self.hideGoCareCat()
            }, 1500)
          }
        })
      }
    })
  },
})