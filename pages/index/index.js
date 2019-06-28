//index.js
//获取应用实例
import { get_gcat_list} from '../../utils/config.js'
import { pageGo} from '../../utils/util.js'
const Mapping = require('../../utils/mappingUtil.js')
// let res ={ "errcode": 0, "errmsg": "", "data": [{ "id": "7372c8b5-3e2f-4e70-a171-ecfa2a425c38", "nickname": "乖乖", "photos": ["https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/guaiguai/64584cfa6086415d97a2c2deba7ba8d.jpg", "https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/guaiguai/7ccbee8b61d94eac4ceb94a50c8b875.jpg", "https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/guaiguai/f71f9c6ce6b2913a6cc69f0eada30d1.jpg"], "sex": 1, "age": 0, "tags": ["无攻击性", "随便摸", "随便摸", "脾气好", "不乱叫", "会用猫砂", "有点蠢"], "province": "上海", "city": "上海市", "region": "浦东新区" }, { "id": "93084319-c0d5-444d-b8b0-0d114410898b", "nickname": "点点", "photos": ["https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/diandian/134e2412615b184db658977fd83a1b6.jpg", "https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/diandian/a5c1dcc313d6f4a64ee53f01df70e01.jpg", "https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/diandian/b50f9e706d011e4380af373e500e3ff.jpg"], "sex": 1, "age": 0, "tags": ["无攻击性", "可以抱", "随便摸", "不乱叫", "胆小"], "province": "上海", "city": "上海市", "region": "浦东新区" }, { "id": "6da055db-5fc4-42f8-ba21-4a73a5401e08", "nickname": "啃啃", "photos": ["https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/kenken/1f62498613449a616b3ada7a4e58a65.jpg", "https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/kenken/556ff2102fa0c6092d18404e3be182f.jpg", "https://s3.cn-north-1.amazonaws.com.cn/nfs.gemii.cc/cat/kenken/e2ea42d3a8070ae40c0c19c51b577c2.jpg"], "sex": 1, "age": 1, "tags": ["很亲人", "可以抱", "随便摸", "脾气好", "会用猫砂", "讲卫生"], "province": "上海", "city": "上海市", "region": "浦东新区" }], "page_info": { "current_page": 0, "total_count": 3, "page_size": 1000 } }

Page({
  data: {
    colorList: ['#76DAB9', '#F3A0A9','#F3C192'],
    headerImgUrls:[
      {
        img: '/images/home_banner_1.jpeg',
        gopage:'/pages/findCat/index'
      }
    ],
    pageList:[]
  },
  onShow: function () {
    let { pageList, colorList } = this.data
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
  },
  goDetail:function(e){
    let id = e.currentTarget.dataset.id
    pageGo(`/pages/details/index?id=${id}`,1)
  }
})
