const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    checkbox: [{
      value: 0,
      name: '10元',
      checked: false,
      hot: false,
    }, {
      value: 1,
      name: '20元',
      checked: true,
      hot: false,
    }, {
      value: 2,
      name: '30元',
      checked: true,
      hot: true,
    }, {
      value: 3,
      name: '60元',
      checked: false,
      hot: true,
    }, {
      value: 4,
      name: '80元',
      checked: false,
      hot: false,
    }, {
      value: 5,
      name: '100元',
      checked: false,
      hot: false,
    }],
    // 导航start
    TabCur: 0,
    scrollLeft:0,
    tab:['全部','附近','只能排序','筛选认'],
    // 导航end
    //订单数据start
    itemList: [{
      pic: '../../../images/index/hostmsg.png',
      name: '狗肉',
      description: '新鲜的狗肉',
      price: 2000.00,
      buynum: 5999
    },
    {
      pic: '../../../images/index/hostmsg.png',
      name: '狗肉',
      description: '新鲜的狗肉',
      price: 2000.00,
      buynum: 5999
    },
    {
      pic: '../../../images/index/hostmsg.png',
      name: '狗肉',
      description: '新鲜的狗肉',
      price: 2000.00,
      buynum: 5999
    },
    {
      pic: '../../../images/index/hostmsg.png',
      name: '狗肉',
      description: '新鲜的狗肉',
      price: 2000.00,
      buynum: 5999
    }]
    //订单数据end
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
  },
  /**
   * 导航选中时间
   * @param {*} e 
   */
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    const id = e.currentTarget.dataset.id;
    if(id==0){
      console.log('全部订单');
    }
  }
})