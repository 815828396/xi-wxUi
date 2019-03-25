// pages/timeAxis/timeAxis.js
Page({
  data: {
    options: 5,
    currentIndex: 0
  },

  onLoad: function (options) {

  },
  click () {
    this.setData({
      options: ++this.data.options,
      currentIndex: ++this.data.currentIndex
    })
  }
})