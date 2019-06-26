// pages/details/index.js
import {
  get_details
} from '../../utils/config.js'
const API = require('../../utils/api.js')
const app = getApp()
const detailsData = {
  "nickname": '库里',
  "age": '3个月',
  "sex": 2,
  "vaccine_status": 1, //0 未定义 1 未免疫 2 已免疫
  "spay_status": 1, //0 未定义 1 未绝育 2 已绝育
  "declaw_status": 1, //0 未定义 1 未驱虫 2 已驱虫
  "hair": '短毛猫', //猫毛类型
  "source": '个人救助', //资源 个人救助
  "province": '上海市',
  "city": '静安区',
  "region": 'string',
  "tags": ['可爱', '啦啦', '呀呀呀', 'hehehe', '可爱', '啦啦', '呀呀呀', 'hehehe', '可爱', '啦啦', '呀呀呀', 'hehehe'],
  "story": '猫咪被压在小区的工地下面，费劲心机解救出来，只有 1 个多月大的样子，非常可爱很亲人呢。', //故事
  "requirements": ['不离不弃，有病就医', '工作稳定，有一定经济基础', '接受家访', '有防盗门、纱窗护网'], //要求
  "update_time": '2019-09-09T09:09:09',
  headUrl: [
    'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
    'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
    'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
  ]
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: null,
    colorList: ['#76DAB9', '#F3A0A9', '#F3C192'],
    data: null,
    goCareCat: false,
    wechatName: API.wechat_name
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options, 'options')
    let id = options.id;
    // get_details(id).then(res=>{
    //   this.setData({
    //     data: res.data
    //   })
    // })

    let {
      colorList
    } = this.data
    this.setData({
      data: {
        ...detailsData,
        "vaccine_status": detailsData.vaccine_status == 1 ? "未免疫" : detailsData.vaccine_status == 2 ? "已免疫" : "", //0 未定义 1 未免疫 2 已免疫
        "spay_status": detailsData.spay_status == 1 ? "未绝育" : detailsData.spay_status == 2 ? "已绝育" : "", //0 未定义 1 未绝育 2 已绝育
        "declaw_status": detailsData.declaw_status == 1 ? "未驱虫" : detailsData.declaw_status == 2 ? "已驱虫" : "", //0 未定义 1 未驱虫 2 已驱虫
        tags: detailsData.tags.map(v => {
          return {
            tag: v,
            color: colorList[Math.floor(Math.random() * colorList.length)]
          }
        })
      }
    })

    console.log(this.data.detailsData, 'detailsData===')
  },
  //申请领养
  showGoCareCat: function() {
    this.setData({
      goCareCat: true
    })
  },
  hideGoCareCat: function() {
    this.setData({
      goCareCat: false
    })
  },
  copyWachat: function() {
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

  //小程序授权 获取用户信息
  getUserInfo: function(e) {
    var self = this;
    app.getUserInfoAll(e, res => {
      self.setData({
        hasUserInfo: res.hasUserInfo,
        userInfo: res.userInfo
      })
      // self.bindPost()
      // self.get_topic_detail()
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})