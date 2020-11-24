//app.js
var http = require('./common/http.js');
App({
  onLoad: function () {
    const param = {
      code: "123456"
    }
    http.request("POST", "auth", param, "登录", res => {
      console.log("登录后端", res);
    }, error => {});
  },
  onLaunch: function () {
    this.wxlogin();
    this.colorUiHeaderInit();
  },
  globalData: {
    ak: 'XSpSgFpfDC5ZMUq6cojw3XqpFa8VGmDF',
    cityName: '', //切换的城市的变量
    userInfo: null
  },
  /**
   * 小程序登录
   */
  wxlogin() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const param = {
          code: res.code
        }
        http.request("POST", "auth", param, "登录", res => {
          console.log("登录后端", res);
        }, error => {

        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
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
  }
})