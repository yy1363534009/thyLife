//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //-------------
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
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
    }],
    gridCol:3,
    skin: false
  },
  onLoad: function () {
    this.custom();
  },
  custom(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
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
//----------
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
gridchange: function (e) {
  this.setData({
    gridCol: e.detail.value
  });
},
gridswitch: function (e) {
  this.setData({
    gridBorder: e.detail.value
  });
},
menuBorder: function (e) {
  this.setData({
    menuBorder: e.detail.value
  });
},
menuArrow: function (e) {
  this.setData({
    menuArrow: e.detail.value
  });
},
menuCard: function (e) {
  this.setData({
    menuCard: e.detail.value
  });
},
switchSex: function (e) {
  this.setData({
    skin: e.detail.value
  });
},

// ListTouch触摸开始
ListTouchStart(e) {
  this.setData({
    ListTouchStart: e.touches[0].pageX
  })
},

// ListTouch计算方向
ListTouchMove(e) {
  this.setData({
    ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
  })
},

// ListTouch计算滚动
ListTouchEnd(e) {
  if (this.data.ListTouchDirection =='left'){
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  } else {
    this.setData({
      modalName: null
    })
  }
  this.setData({
    ListTouchDirection: null
  })
}
})
