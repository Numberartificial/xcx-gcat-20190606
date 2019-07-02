// pages/component/AddGroup/index.js
Component({
  /**
  * 组件的属性列表
  */
  properties: {
    wechat_name: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    wechat_name: '',
    goCareCat:false

  },
  /**
   * 组件的方法列表
   */
  methods: {
    showGoCareCat(){
      this.setData({
        goCareCat:true
      })
    },
    hideGoCareCat() {
      this.setData({
        goCareCat: false
      })
    },
    _copyWachat(e) {
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

  }
})