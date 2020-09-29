//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 跳转页面
   */
  goPage: function (event) {
    let pageName = event.currentTarget.dataset.pagename;
    console.log('跳转页面：' + pageName)
    let url = '../' + pageName + '/' + pageName;
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 跳转tab页面
   */
  goTabPage: function (event) {
    let pageName = event.currentTarget.dataset.pagename;
    console.log('跳转Tab页面：' + pageName)
    let url = '../' + pageName + '/' + pageName;
    wx.switchTab({
      url: url,
    })
  }
})