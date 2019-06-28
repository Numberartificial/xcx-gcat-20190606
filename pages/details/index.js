// pages/details/index.js
import {get_details} from '../../utils/config.js'
const API = require('../../utils/api.js')
const Mapping = require('../../utils/mappingUtil.js')

//  const res = 
// {"errcode":0,"errmsg":"","data":{"id":"7372c8b5-3e2f-4e70-a171-ecfa2a425c38","nickname":"乖乖","photos":["https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/guaiguai/64584cfa6086415d97a2c2deba7ba8d.jpg","https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/guaiguai/7ccbee8b61d94eac4ceb94a50c8b875.jpg","https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/guaiguai/f71f9c6ce6b2913a6cc69f0eada30d1.jpg"],"sex":1,"age":0,"hair":2,"province":"上海","city":"上海市","region":"浦东新区","source":2,"tags":["无攻击性","随便摸","随便摸","脾气好","不乱叫","会用猫砂","有点蠢"],"story":"下雨天，在小区里扔垃圾的时候，在旁边一直叫。过去一看很小，大概2个月左右的样子，一下就抓住了，不咬人不抓人不挣扎。回家后洗了澡剪了指甲，一点也不挣扎，比家里养的猫都要乖好多。洗澡的时候，发现尾巴断了一小截，没断的那部分，也碎成几块了，真的是小可怜。","vaccine_status":1,"spay_status":1,"declaw_status":1,"adopt_requirements":["有纱窗","家人同意","不虐待，不离不弃，有病就医","适龄绝育","工作稳定，有经济来源","接受家访"],"status":1}}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList: ['#76DAB9', '#F3A0A9', '#F3C192'],
    data: null,
    goCareCat: false,
    wechatName: API.wechat_name
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options, 'options')
    let id = options.id;
    let { colorList } = this.data
    get_details(id).then(res=>{
      if (res.errcode == 0) {
        let detailsData = res.data;
        this.setData({
          data: {
            ...detailsData,
            age: Mapping.ageMap[detailsData.age],
            sex: Mapping.sexMap[detailsData.sex],
            vaccine_status: Mapping.vaccineMap[detailsData.vaccine_status],
            spay_status: Mapping.spayMap[detailsData.spay_status],
            declaw_status: Mapping.declawMap[detailsData.declaw_status],
            hair: Mapping.hairMap[detailsData.hair],
            source: Mapping.sourceMap[detailsData.source],
            photos: detailsData.photos.map(v=>{
              return {
                img: v,
                gopage: null
              }
            }),
            tags: detailsData.tags.map(v => {
              return {
                tag: v,
                color: colorList[Math.floor(Math.random() * colorList.length)]
              }
            })
          }
        })

        // console.log(this.data.data, 'detailsData===')
      }
    })

    
    
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})