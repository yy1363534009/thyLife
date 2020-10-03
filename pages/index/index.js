//index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: '上海',
    cardCur: 0,
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
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //进入页面获取本地存储 查看是否有之前选择的城市区域----
    //如果有本地存储 重新设置 location  没有数据 使用默认上海
    var cityName = wx.getStorageSync('cityName');
    if (cityName) {
      this.setData({
        location: cityName
      })
    }

    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可

    // wx.request({
    //   url: 'http://localhost:8089/index/', //仅为示例，并非真实的接口地址
    //   method: 'GET',
    //   data: {
    //     x: 'abc',
    //     y: '123'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log('状态码：' + res.statusCode + '，响应结果：' + res.data)
    //   },
    //   fail(res) {
    //     console.log('状态码：' + res.statusCode + '，响应结果：' + res.data)
    //   },
    //   complete(res) {
    //     console.log('页面加载后台请求结束' + '状态码：' + res.statusCode + '，响应结果：' + res.data)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('页面显示');
    console.log(app);
    //重新修改data 
   if(app.globalData.cityName){//全局有值
     this.setData({
       location: app.globalData.cityName,
     })
   }
  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  }
})