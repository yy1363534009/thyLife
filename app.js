//app.js
var http = require('./common/http.js');
App({

  /**
   * 全局变量
   */
  globalData: {
    ak: 'XSpSgFpfDC5ZMUq6cojw3XqpFa8VGmDF', //百度地图个人ak
    cityName: '', //切换的城市的变量
    userInfo: null, //保存当前用户信息
  },


  /**
   * 全局只加载一次
   */
  onLaunch: function () {
    this.loginInit();
    this.colorUiHeaderInit();
  },


  /**
   * 登录初始化
   */
  loginInit() {
    // 获取用户信息
    wx.getSetting({

      success: res => {

        // 判断用户是否授权，正常直接通过微信自带的函数【wx.getUserInfo】获取用户信息并展示，但是本小程序支持用户信息更改，所以请求后端获取用户信息
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          
          wx.getUserInfo({
            success: res => {
              wx.showLoading({
                title: 'app.js--wx.getSetting--wx.getUserInfo--success',
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 2000)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })

          // 授权登录->通过code请求后端授权获取token，将token绑定在所有请求头上用于后端认证
          wx.login({
            success: res => {
              let param = {
                code: res.code
              };
              http.request("POST", "auth/wechatLogin", param, "登录", res => {
                console.log("微信小程序后端登录响应的结果", res);
                wx.setStorageSync('token', res.data.token);
                console.log("微信小程序后端登录响应的结果-token", wx.getStorageSync('token'));
              }, error => {});
            }
          })
        }
      }
    })
  },


  /**
   * colorUi获取头部高度
   */
  colorUiHeaderInit() {
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    // console.log('appjs-Custom:'+this.globalData.Custom+'-CustomBar:'+this.globalData.CustomBar)
  },


})