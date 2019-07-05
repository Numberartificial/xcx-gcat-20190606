// pages/details/index.js
import {get_details} from '../../utils/config.js'
import { successShowText } from '../../utils/util'

const API = require('../../utils/api.js')
const Mapping = require('../../utils/mappingUtil.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList: ['#76DAB9', '#F3A0A9', '#F3C192'],
    data: null,
    goCareCat: false,
    wechatName: API.wechat_name,

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
            source: Mapping.sourceMap[detailsData.source],
            photos: detailsData.photos,
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
            successShowText('复制成功')
          },
          fail(res) {
            successShowText('复制失败','none')
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