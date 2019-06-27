// pages/component/Swiper/index.js
Component({
  /**
  * 组件的属性列表
  */
  properties: {
    swiperImg:Object,
    height:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached: function () { },

  /**
   * 组件的方法列表
   */
  methods: {
    _goPage:function(e){
      let url = e.currentTarget.dataset.url
      if(url){
        wx.switchTab({
          url: e.currentTarget.dataset.url,
        })
      }
    }

  }
})