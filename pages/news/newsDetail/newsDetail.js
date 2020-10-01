const app = getApp();
Page({
  data: {},
  appraiseShowChangge(e) {
    console.log('显示评价切换方法')
    this.setData({
      appraiseIsShow: true
    })
  },
});