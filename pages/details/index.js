// pages/details/index.js
import {get_details} from '../../utils/config.js'
const API = require('../../utils/api.js')
const Mapping = require('../../utils/mappingUtil.js')

// const detailsData = {
//   "nickname": '库里',
//   "age": 3,
//   "sex": 2,
//   "vaccine_status": 1, //0 未定义 1 未免疫 2 已免疫
//   "spay_status": 1, //0 未定义 1 未绝育 2 已绝育
//   "declaw_status": 1, //0 未定义 1 未驱虫 2 已驱虫
//   "hair": 1, //猫毛类型
//   "source": 2, //资源 个人救助
//   "province": '上海市',
//   "city": '静安区',
//   "region": '',
//   "tags": ['可爱', '调皮', '无攻击性'],
//   "story": '猫咪被压在小区的工地下面，费劲心机解救出来，只有 1 个多月大的样子，非常可爱很亲人呢。', //故事
//   "requirements": ['不离不弃，有病就医', '工作稳定，有一定经济基础', '接受家访', '有防盗门、纱窗护网'], //要求
//   "update_time": '2019-09-09T09:09:09',
//   "photos": [
//     '/images/1.png',
//     '/images/2.png'
//   ]
// }

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
    console.log(options, 'options')
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
            photos: detailsData.photos.split(';').map(v=>{
              return {
                img: v,
                gopage: null
              }
            }),
            adopt_requirements: detailsData.adopt_requirements.split(';'),
            tags: detailsData.tags.split(';').map(v => {
              return {
                tag: v,
                color: colorList[Math.floor(Math.random() * colorList.length)]
              }
            })
          }
        })

        console.log(this.data.data, 'detailsData===')
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