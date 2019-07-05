const EditMap = {
  ageMap: [
    { status: 0, name: '不确定', select: false },
    { status: 1, name: '0-3个月', select: false },
    { status: 2, name: '4-6个月', select: false },
    { status: 3, name: '7-16个月', select: false },
    { status: 4, name: '1岁', select: false },
    { status: 5, name: '2岁', select: false },
    { status: 6, name: '3岁', select: false },
    { status: 7, name: '4岁', select: false },
    { status: 8, name: '5岁及以上', select: false }
  ],

  sexMap:[
    { status: 1, name: '男孩', select: false },
    { status: 2, name: '女孩', select: false },
    { status: 0, name: '不确定', select: false }
  ],

  spayMap: [
    { status: 2, name: '已绝育', select: false },
    { status: 1, name: '未绝育', select: false },
    { status: 0, name: '不确定', select: false }
  ],
  vaccineMap: [
    { status: 2, name: '已接种', select: false },
    { status: 1, name: '未接种', select: false },
    { status: 3, name: '接种中', select: false },
    { status: 0, name: '不确定', select: false }
  ],

  declawMap: [
    { status: 2, name: '已驱虫', select: false },
    { status: 1, name: '未驱虫', select: false },
    { status: 0, name: '不确定', select: false },
  ],

  catFeature:[
    { name: '很亲人', select: false },
    { name: '高冷', select: false },
    { name: '无攻击性', select: false },
    { name: '会踩奶', select: false },
    { name: '可以抱', select: false },
    { name: '随便摸', select: false },
    { name: '脾气好', select: false },
    { name: '很健康', select: false },
    { name: '不乱叫', select: false },
    { name: '胆小', select: false },
    { name: '会用猫砂', select: false },
    { name: '讲卫生', select: false },
    { name: '聪明', select: false },
    { name: '活泼', select: false },
    { name: '不掉毛', select: false }
  ],

  adoptRequest:[
    { name: '仅限同城', select: true },
    { name: '家人同意养猫', select: true },
    { name: '有纱窗', select: true },
    { name: '按时打疫苗', select: true },
    { name: '适龄绝育', select: true },
    { name: '有病就医', select: true },
    { name: '不虐待', select: true },
    { name: '不买卖', select: true },
    { name: '接受家访', select: false },
    { name: '接受回访', select: false },
    { name: '工作稳定', select: false },
    { name: '整租房屋', select: false }
  ]
}


module.exports = EditMap;