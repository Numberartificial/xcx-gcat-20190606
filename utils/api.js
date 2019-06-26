
 
const api = {
  wechat_name:"grove02",//工作人员微信号
  APP_ID: 'wx4e00368b7d02ab26', //APPID 栗子小助手
  API_PATH :'https://gclub.lizmom.cn:18080',
  findCatInfo: [
    {
      index: 1,
      title: '精准匹配',
      content: '将您的找猫需求与本地各大救助机构里的猫进行匹配；',
      type: 'small'
    },
    {
      index: 2,
      title: '全网找寻',
      content: '关注全网新发布的猫咪领养信息，和您的需求进行匹配;',
      type: 'small'
    },
    {
      index: 3,
      title: '全力扩散',
      content: '我们会将您的找猫需求扩散至微博、豆瓣、百度、微信群中让更多领养人看到（留的我们的联系方式，您不会被打扰）。',
      type: 'big'
    }
  ],
  careCatInfo : [
    {
      index: 1,
      title: '替你发布',
      content: '只需将图片描述发给我们，我们会替您发布领养信息（对于领养机构，我们可主动上门拍照录像发布）；',
      type: 'big'
    },
    {
      index: 2,
      title: '全网扩散',
      content: '将您的送养需求扩散至微博、豆瓣、百度、微信群中，让更多想要领养的人看到；',
      type: 'small'
    },
    {
      index: 3,
      title: '要求过滤',
      content: '根据您对领养人的要求（有纱窗护网、接受家访等），提前对领养人信息进行收集过滤，按照要求过滤后才会将其推送给您；',
      type: 'big'
    },
    {
      index: 4,
      title: '事后追踪',
      content: '送养成功后，我们将推动领养人定期发布猫咪的实际生活情况（是否按时打疫苗，绝育等），并将情况定时反馈给您。',
      type: 'big'
    }
  ]
}
module.exports = api
