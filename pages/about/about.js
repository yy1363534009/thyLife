//获取应用实例
const app = getApp()
var http = require('../../common/http.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gridCol: 4,
    myServerList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: '订单'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '收藏'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '券包'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '会员卡'
    }],
    otherServerList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }]
  },
  onShow: function () {},
  onLoad: function () {
    this.onLoadUserInfo();
  },
  /**
   * 页面加载获取用户信息
   */
  onLoadUserInfo() {
    console.log('about.js->onLoad()->[app.globalData.userInfo]', app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于getUserInfo()是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 用户点击获取用户信息进行授权
   */
  getUserInfo(e) {
    if (e.detail.userInfo) {
      //用户按了确认授权按钮
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      // 授权登录->通过code请求后端授权（初次请求会进行注册）获取token，将token绑定在所有请求头上用于后端认证
      wx.login({
        success: res => {
          let param = {
            code: res.code,
            userDetail:app.globalData.userInfo
          };
          http.request("POST", "/auth/wechatLogin", param, "登录", 
          res => {
            console.log("微信小程序后端登录响应的结果", res);
            app.globalData.header.Authorization = app.globalData.header.Authorization + res.data.token;
            console.log("微信小程序后端登录响应的结果-header", app.globalData.header.Authorization);
          }, error => {

          });
        }
      })
    } else {
      //用户按了拒绝授权按钮
      wx.showModal({
        title: '警告',
        content: '您拒绝授权，使用小程序，请授权！',
        showCancel: false,
        confirmText: '确定',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
            wx.showLoading({
              title: '用户点击了“返回授权”',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 500)
          }
        }
      });
    }
  }
})