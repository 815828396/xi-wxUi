// package_component/pages/dialog/index.js
Page({

  data: {
    visiableDialog: false,
    visiableDialog1: false
  },

  onLoad: function (options) {

  },

  popDialog () {
    this.setData({ visiableDialog: true });
  },
  popDialog1 () {
    this.setData({ visiableDialog1: true });
  },
  handleClick ({ detail }) {
    console.log(detail);
  }
})