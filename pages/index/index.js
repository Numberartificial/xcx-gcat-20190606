//index.js
//获取应用实例
import { get_gcat_list} from '../../utils/config.js'
import { pageGo} from '../../utils/util.js'
const Mapping = require('../../utils/mappingUtil.js')

Page({
  data: {
    colorList: ['#76DAB9', '#F3A0A9','#F3C192'],
    headerImgUrls:[
      {
        img: '/images/home_banner_1.jpeg',
        gopage:'/pages/findCat/index'
      }
    ],
    pageList:[
      // {
      //   id:1,
      //   "photos":[
      //     '/images/1.png',
      //     '/images/2.png'
      //   ],
      //   "name": '库里',
      //   "sex": 1,//1 男孩 2 女孩 0 未知
      //   "age": 1,
      //   "tags": ['可爱','调皮','无攻击性'],
      //   "province": '上海市',
      //   "city": '徐汇区',
      //   "region": '',
      // },
    ]
  },
  onLoad: function () {
    let { pageList, colorList } = this.data
    get_gcat_list({ status:1, current_page: 0, page_size:1000}).then(res=>{
      if (res.errcode==0){
        let data = res.data;
        pageList = data.map(item => {
            return {
              ...item,
              age: Mapping.ageMap[item.age],
              sex: Mapping.sexMap[item.sex],
              photos: item.photos.split(';'),
              tags: item.tags.split(';').map(v => {
                return {
                  tag: v,
                  color: colorList[Math.floor(Math.random() * colorList.length)]
                }
              }).slice(0,3)
            }
          })
        this.setData({ pageList }, () => {
          console.log(pageList, 'pageList===')
        })
      }
    }) 
  },
  goDetail:function(e){
    let id = e.currentTarget.dataset.id
    pageGo(`/pages/details/index?id=${id}`,1)
  }
})
