// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "/pages/index/index",
            "iconPath": "icon/find.png",
            "selectedIconPath": "icon/find_active.png",
            "text": "找猫",
            "isTabbar": true
          },
          {
            "pagePath": "/pages/release/index",
            "iconPath": "icon/icon_release.png",
            "isSpecial": true,
            "text": "发布",
            "isTabbar": false

          },
          {
            "pagePath": "/pages/mine/mine",
            "iconPath": "icon/me.png",
            "selectedIconPath": "icon/me_active.png",
            "text": "我的",
            "isTabbar": true
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model == "iPhone X" ? true : false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _navigator(e){
      let path = e.currentTarget.dataset.path
      let tabbar = e.currentTarget.dataset.tabbar

      if (tabbar){
        wx.switchTab({
          url: path,
        })
      }else{
        wx.navigateTo({
          url: path,
        })
      }
    }

  }
})
