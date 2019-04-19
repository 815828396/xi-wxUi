// pages/timeAxis/timeAxis.js
Page({
  data: {
    options: 3,
    index: 0,
    currentIndex: 0
  },

  onLoad: function (options) {

  },
  click () {
    this.setData({ index: ++this.data.index })
    // this.setData({
    //   options: ++this.data.options,
    //   currentIndex: ++this.data.currentIndex
    // })
  }
})