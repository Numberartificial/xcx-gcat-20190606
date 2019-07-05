// pages/my/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo:false,
    contentList:[
      {
        id:1,
        icon: '/images/mine_cat.png',
        text:'我的发布',
        path:'/pages/myRelease/index'
      },
      {
        id: 2,
        icon: '/images/mine_opinion.png',
        text: '意见反馈',
        path: '/pages/option/index'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
   

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
    let unionId = wx.getStorageSync('union_id')
    if (unionId && unionId != 'null') {
      this.setData({
        hasUserInfo: true
      })
    } else {
      this.setData({
        hasUserInfo: false,
      })

    }

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

  navigateTo:function (e) {
    let path =  e.currentTarget.dataset.path
    wx.navigateTo({
      url: path
    });
    
  },
  //小程序授权 获取用户信息
  getUserInfo: function (e) {
    var self = this;
    app.getUserInfoAll(e, res => {
      self.setData({
        hasUserInfo: res.hasUserInfo,
        userInfo: res.userInfo
      })
      wx.navigateTo({
        url: '/pages/myRelease/index'
      });
    })
  },

  
})