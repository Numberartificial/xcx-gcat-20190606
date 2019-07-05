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
    _previewImage: function (e) {
      console.log(e, this.properties.swiperImg,'eee')
      wx.previewImage({
        current: e.currentTarget.dataset.url, // 当前显示图片的http链接
        urls: this.properties.swiperImg // 需要预览的图片http链接列表
      })
    },

  }
})