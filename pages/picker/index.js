// package_component/pages/picker/index.js
Page({
  data: {
    visiable: false
  },
  onLoad: function (options) {

  },
  click () {
    this.setData({ visiable: true })
  },
  bindChange ({ detail }) {

    console.log(detail)
  }
})