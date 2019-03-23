// package_component/pages/modal/index.js
Page({

  data: {
    isModal: false
  },
  visiable () {
    this.setData({ isModal: true });
  },
  handleClick ({ detail }) {
    console.log(detail)
  }
})
