// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航start
    TabCur: 0,
    scrollLeft: 0,
    tab: ['全部订单', '待付款', '待开工', '待确认', '待评价', '退款 / 售后'],
    // 导航end
    //订单数据start
    itemList: [{
        pic: '../../images/index/hostmsg.png',
        name: '狗肉',
        description: '新鲜的狗肉',
        price: 2000.00,
        buynum: 5999
      },
      {
        pic: '../../images/index/hostmsg.png',
        name: '狗肉',
        description: '新鲜的狗肉',
        price: 2000.00,
        buynum: 5999
      }
      //订单数据end
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 导航选中时间
   * @param {*} e 
   */
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    const id = e.currentTarget.dataset.id;
    if (id == 0) {
      console.log('全部订单');
    }
  }
})