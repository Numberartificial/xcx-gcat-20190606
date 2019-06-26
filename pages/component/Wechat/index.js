// pages/component/Wechat/index.js
Component({
  /**
  * 组件的属性列表
  */
  properties: {
    wechat_name: String,
    hasUserInfo:Boolean,
    isSubmit:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    wechat_name:'',
    wechat_value:''
  },

  attached: function () { console.log('attached') 
    let union_id = wx.getStorageSync('union_id')

    if (union_id && union_id != 'null') {
      this.setData({
        hasUserInfo:true
      })
    }else{
      this.setData({
        hasUserInfo: false
      })
    }
  },
  moved: function () { console.log('moved') },
  detached: function () { console.log('detached') },
  /**
   * 组件的方法列表
   */
  methods: {
    //授权
    _getUserInfo(e) {
      //e->detail->detail
      //子传父方式
      const myEventDetail = e.detail // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('userinfo', myEventDetail, myEventOption)
    },
    _copyWachat(e){
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
    _changeInput(e){
      this.setData({
        wechat_value: e.detail.value
      })  
    },
    _submitWechatValue(e){
      // console.log(e,'_submitWechatValue')
      const { wechat_value} =this.data
      if (wechat_value == '') {
        wx.showToast({
          title: '请填写微信号',
          icon:'none'
        })
        return
      }
      const myEventDetail = {
        wechat_value: wechat_value
      } // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('submit', myEventDetail, myEventOption)
    }
  }
})