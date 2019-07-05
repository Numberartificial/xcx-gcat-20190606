// pages/release/index.js
import { upload_photos_url, submit_cats, get_details, get_wechat_id} from '../../utils/config'
import { pageGo, successShowText, analyzeStatus, analyzeName} from '../../utils/util'
const EditMap = require('../../utils/editMaputil')
const Mapping = require('../../utils/mappingUtil.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    pageType:0,//0 基本信息 1 领养信息 2 领养联系
    EditMap: EditMap,
    verifyPage0:false,
    verifyPage2: false,
    parmas:{
      "photos": [],
      "province": "",
      "city": "",
      "region": "",
      "wechat_id": ""

    },
    uploadImgUrl: upload_photos_url

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    console.log(options.id,'options.id')
    if(id){
      this.get_edit_details(id)
    }else{
      let { parmas } = this.data
      parmas.adopt_requirements = EditMap.adoptRequest.filter(v => v.select).map(item => item.name)
      this.setData({ parmas })
    }
  },
  get_edit_details:function(id){
    Promise.all([get_details(id), get_wechat_id(wx.getStorageSync('union_id'))]).then(res=>{
      let detailsData = res[0].data;
      let newEditMap = {
        ageMap: analyzeStatus(detailsData.age, EditMap.ageMap),
        sexMap: analyzeStatus(detailsData.sex, EditMap.sexMap),
        spayMap: analyzeStatus(detailsData.spay_status, EditMap.spayMap),
        vaccineMap: analyzeStatus(detailsData.vaccine_status, EditMap.vaccineMap),
        declawMap: analyzeStatus(detailsData.declaw_status, EditMap.declawMap),
        catFeature: detailsData.tags ? analyzeName(detailsData.tags, EditMap.catFeature) : EditMap.catFeature,
        adoptRequest: detailsData.adopt_requirements ? analyzeName(detailsData.adopt_requirements, EditMap.adoptRequest) : EditMap.adoptRequest
      }

      this.setData({
        parmas: {
          ...detailsData,
          age: Mapping.ageMapNew[detailsData.age],
          wechat_id : res[1].data
        },
        EditMap: newEditMap
      }, () => this.verifyParmas())
    })
   
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

  nextPage:function (e) {
    const page = e.currentTarget.dataset.page;
    this.setData({
      pageType: page
    }, () => this.verifyParmas())
    
  },
  changeIpt:function (e) {
    let {parmas} =this.data
    const name = e.currentTarget.dataset.name;
    const value = e.detail.value;
    parmas[name] = value
    this.setData({
      parmas
    }, () => this.verifyParmas())
  },
  bindPickerChange:function (e) {
    let { parmas } = this.data
    const name = e.currentTarget.dataset.name;
    const value = e.detail.value

    if (name =='region'){
        parmas.province = value[0]
        parmas.city = value[1]
        parmas.region = value[2]
    }else{
      parmas[name] = Mapping.ageMapNew[value]
    }
   
    this.setData({
      parmas
    }, () => this.verifyParmas())
  },

  selectTab:function (e) {
    let { parmas, EditMap} = this.data
    const dataset = e.currentTarget.dataset
    parmas[dataset.name] = dataset.status
    EditMap[dataset.map]=EditMap[dataset.map].map(v=>(
      v.status == dataset.status ? { ...v, select: true } : { ...v, select: false }
    ))
    this.setData({
      parmas,
      EditMap
    },() => this.verifyParmas())
  },

  changeTab:function (e) {
    let { parmas, EditMap } = this.data

    const dataset = e.currentTarget.dataset
    let catFeature = EditMap[dataset.map]

    const index = catFeature.findIndex(v => v.name == dataset.tag)

    catFeature[index].select = !catFeature[index].select

    parmas[dataset.name] = catFeature.filter(v => v.select).map(v => v.name)
    this.setData({
      parmas,
      EditMap
    },() => this.verifyParmas())
  },
  //上传图片
  //监听组件事件，返回的结果
  uploadPhotos: function (e) {
    let { parmas } = this.data
    parmas.photos = e.detail.picsList
    this.setData({
      parmas
    }, () => this.verifyParmas())
  },
  // 判断按钮是否点亮
  verifyParmas:function () {
    const { pageType, parmas} =this.data
    
    switch (pageType) {
      case 0:
        if ( parmas.nickname != '' && parmas.sex != '' && parmas.age != '' && parmas.vaccine_status != '' && parmas.spay_status != ''  && parmas.declaw_status != '' && parmas.photos.length != 0 ){
            this.setData({
              verifyPage0:true
            })
          }else{
            this.setData({
              verifyPage0: false
            })
          }
        break;
      case 2:
        if (parmas.wechat_id != '' && parmas.province != '' ){
            this.setData({
              verifyPage2: true
            })
          }else{
            this.setData({
              verifyPage2: false
            })
          }
        break;
      default:
        break;
    }
    
  },

  //发布
  handleRelease:function () {
    let { verifyPage2, parmas} =this.data
    if (!verifyPage2) return

    parmas.user_id = wx.getStorageSync('union_id')

    console.log(parmas, '发布  hand leRelease');

    submit_cats(parmas).then(res=>{
      if (res.errcode==0){
        successShowText('发布成功')
        pageGo("/pages/myRelease/index",2)
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
      self.handleRelease()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})