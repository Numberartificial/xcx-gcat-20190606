//index.js
//获取应用实例
import { get_gcat_list, get_banner_data} from '../../utils/config.js'
import { pageGo} from '../../utils/util.js'
const app = getApp()
const Mapping = require('../../utils/mappingUtil.js')
Page({
  data: {
    tabbar: {},
    colorList: ['#76DAB9', '#F3A0A9','#F3C192'],
    headerImgUrls:[
      {
        img: '/images/home_banner_1.jpeg',
        gopage:'/pages/findCat/index'
      }
    ],
    pageList:[],
    previewData:{
      cat_num:0,
      person_num:0
    }
  },
  onLoad:function(){
    app.editTabbar();
  },
  onShow: function () {
    let { pageList, colorList } = this.data
    get_banner_data().then(res => {
      if (res.errcode == 0) {
        this.setData({
          previewData: res.data
        })
      }
    })

    get_gcat_list({ status:1, current_page: 0, page_size:1000}).then(res=>{
      if (res.errcode==0){
        let data = res.data;
        pageList = data.map(item => {
            return {
              ...item,
              age: Mapping.ageMap[item.age],
              sex: Mapping.sexMap[item.sex],
              tags: item.tags.map(v => {
                return {
                  tag: v,
                  color: colorList[Math.floor(Math.random() * colorList.length)]
                }
              }).slice(0,3)
            }
          })
        this.setData({ pageList }, () => {
          // console.log(pageList, 'pageList===')
        })
      }
    }) 

    let me = this;
    //获取tab的距离顶部高度
    const query = wx.createSelectorQuery();
    query.select('#keeptop').boundingClientRect(function (res) {
      console.log(res.top)
      me.data.tabTop = res.top
    }).exec();

   
  },
  goDetail:function(e){
    let id = e.currentTarget.dataset.id
    pageGo(`/pages/details/index?id=${id}`,1)
  },
  goFindCat: function () {
    pageGo(`/pages/findCat/index`, 1)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll:function(e){
    let me = this;
    //tab的吸顶效果
  console.log(e.scrollTop > me.data.tabTop)
    if(e.scrollTop>me.data.tabTop){
        if(me.data.tabFix){
            return
        }else{
            me.setData({
                tabFix:'Fixed'
            })
        }
    }else{
        me.setData({
            tabFix:''
        })
    }
},
})
