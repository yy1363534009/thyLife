// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
  },
  search(event) {
    console.log('>>>搜索的值是：'+event.detail.value);
  }
})