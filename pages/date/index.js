// pages/date/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visiableDate: false,
    visiableTime: false,
  },

  pickerData ({ detail }) {
    const {target} = detail;
    if (target === 'date') this.setData({visiableDate: true});
    if (target === 'time') this.setData({visiableTime: true});
  },
  change ({detail}) {
    console.log(detail);
  }
})