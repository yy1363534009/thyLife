// pages/selectCity/selectCity.js
// var http = require('../../common/http.js');
var app = getApp();
var mapapi = require('../../common/baidu-map-api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity: ['北京', '上海', '广州', '深圳', '天津', '西安', '重庆', '杭州', '南京', '齐齐哈尔'], //热门城市

    // latitude: "23.099994",
    // longitude: "113.324520",
    latitude: "46.397830",
    longitude: "123.423627",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //第一步：获取热门城市
    // http('get', '/api/hot/city', {}, '', res => {
    //   console.log(res);
    //   this.setData({
    //     hotCity: res.data
    //   })
    // })
  },
  //第二步:点击定位---1.获取当前的经纬度  2.显示所在的城市  3.返回食疗坊 带着当前城市
  getLocation: function () {
    wx.getLocation({
      success: (res) => {
        console.log('>>>获取当前的位置:', +res);
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        this.setData({
          latitude: latitude,
          longitude: longitude
        });
        mapapi.reverse_geocoding(
          latitude, longitude, res => {
            console.log('>>>成功-百度地图api【根据经纬度获取详细地址】响应结果:', res);
            var cityName = res.result.addressComponent.city;
            console.log('>>>根据经纬度获取详细地址:', cityName);
            app.globalData.cityName = cityName;
            var city = {
              cityName: cityName,
              latitude: latitude,
              longitude: longitude
            }
            wx.setStorageSync('cityStorage', city);
            wx.switchTab({
              url: '../index/index',
            })
            //方法2：wx.reLaunch()跳转
            // wx.reLaunch({
            //   url: '../food/food?cityName=' + cityName,
            // })
          }
        );
      },
    })
  },
  //第三步：点击人城市按钮--切换当前的城市 1.点击按钮获取当前的点击城市 2.把获取的值存储本地 全局 3.跳转页面
  selectCity: function (e) {
    var cityName = e.currentTarget.dataset.name;
    mapapi.geocoding(cityName, res => {
      console.log('>>>成功-百度地图api根据城市名称获取经纬度-城市【' + cityName + '】响应结果:', res)
      app.globalData.cityName = cityName;
      var city = {
        cityName: cityName,
        latitude: res.result.location.lat,
        longitude: res.result.location.lng
      }
      wx.setStorageSync('cityStorage', city);
      wx.switchTab({
        url: '../index/index',
      })
    }, res => {
      console.log('>>>失败-百度地图api根据城市名称获取经纬度-城市【' + cityName + '】响应结果:', res)
    })

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
    var city = wx.getStorageSync('cityStorage');
    if (city.cityName) {
      this.setData({
        latitude: city.latitude,
        longitude: city.longitude,
      })
    }
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

  }
})