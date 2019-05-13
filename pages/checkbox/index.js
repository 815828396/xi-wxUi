// pages/checkbox/checkbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friut: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  change({ detail }) {
    this.setData({ friut: detail })
  }
})