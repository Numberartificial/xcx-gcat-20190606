//index.js
//获取应用实例
const app = getApp()
import { get_gcat_list} from '../../utils/config.js'
import { pageGo} from '../../utils/util.js'
Page({
  data: {
    colorList: ['#76DAB9', '#F3A0A9','#F3C192'],
    headerImgUrls:[
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    pageList:[
      {
        id:1,
        "img":'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
        "name": '库里',
        "sex": 1,//1 男孩 2 女孩 0 未知
        "age": '0-3个月',
        "tags": ['可爱','调皮','无攻击性'],
        "province": '上海市',
        "city": '徐汇区',
        "region": 'string',
      },
      {
        id: 2,
        "img": 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
        "name": 'ku;i',
        "sex": 2,//1 男孩 2 女孩 0 未知
        "age": '2岁',
        "tags": ['1可爱', '调皮', '无攻击性'],
        "province": '上海市',
        "city": '静安区区',
        "region": 'string',
      },
      {
        id: 3,
        "img": 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
        "name": 'ku;i',
        "sex": 0,//1 男孩 2 女孩 0 未知
        "age": '1岁',
        "tags": ['2可爱', '无攻击性'],
        "province": '上海市',
        "city": '静安区',
        "region": '',
      }

    ]
  },
  onLoad: function () {
    let { pageList, colorList } = this.data
    // get_gcat_list({ current_page: 0, page_size:null}).then(res=>{

    // })

    
    pageList = pageList.map(item=>{
     return {
       ...item,
       tags: item.tags.map(v =>{ 
         return {
            tag: v,
            color: colorList[Math.floor(Math.random() * colorList.length)]
          }
       })
     }
    })

    this.setData({ pageList},()=>{
      console.log(pageList, 'pageList===')
    })
  },
  goDetail:function(e){
    let id = e.target.dataset.id
    pageGo(`/pages/details/index?id=${id}`,1)
  }
})
