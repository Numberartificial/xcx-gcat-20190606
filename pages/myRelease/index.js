// pages/myRelease/index.js
import { cats_release_list, update_release_status} from '../../utils/config'
import { pageGo } from '../../utils/util'

const Mapping = require('../../utils/mappingUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList: ['#76DAB9', '#F3A0A9', '#F3C192'],
    activeTab: 1, //1.未被领养 2.已被领养
    activeLeft:'22%',
    navtabs:[ 
      { status:1, txt:'待领养', left:'22%' },
      { status: 2, txt: '已领养', left: '67%' }
    ],
    pageList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReleaseList(this.data.activeTab) 
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {

  },
  changeNavtabs: function (e) {
    let status = e.currentTarget.dataset.status;
    this.getReleaseList(status)
    this.setData({
      activeTab: status,
      activeLeft: status == 1 ? "22%" : '67%',
    }) 

  },

  handleAdopted:function (e) {
    let self =this
    let cat_id = e.currentTarget.dataset.catid;
    let status = this.data.activeTab
    let nextStatus = status == 1 ? 2 : 1 ;

    console.log(status, 'status==');
    console.log(nextStatus,'nextStatus');
    
    let params={
      cat_id: cat_id,
      status: status==1?2:1 //1.重新发布 2.领养完成
    }
    console.log(params,'params');
  
    update_release_status(params).then(res=>{
      if (res.errcode==0){
        self.getReleaseList(nextStatus)
        self.setData({
          activeTab: nextStatus,
          activeLeft: nextStatus == 1 ? "22%" : '67%',
        }) 
      }
    })
    
  },

  getReleaseList: function (status) {
    let { pageList, colorList} =this.data
    let params={
      user_id:wx.getStorageSync('union_id'),
      status: status,
      current_page:0,
      page_size:1000
    }
    cats_release_list(params).then(res=>{
      if (res.errcode==0){
        pageList = res.data.map(item => {
          return {
            ...item,
            age: Mapping.ageMap[item.age],
            sex: Mapping.sexMap[item.sex],
            tags: item.tags?item.tags.map(v => {
              return {
                tag: v,
                color: colorList[Math.floor(Math.random() * colorList.length)]
              }
            }).slice(0, 3):[]
          }
        })
        this.setData({
          pageList
        },()=>{
            console.log(this.data.pageList, 'pageList===')
        })
      }

    }).catch(req=>{
      throw req
    })
  },

  goEditAdopt:function(e){
    let cat_id = e.currentTarget.dataset.catid;
    pageGo("/pages/release/index?id=" + cat_id,2)
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  
})