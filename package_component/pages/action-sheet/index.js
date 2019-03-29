// package_component/pages/action-sheet/index.js
Page({
  data: {
    visiable: false,
    visiable1: false,
    actions: [
      { title: '重新编辑' },
      { title: '重新编辑' },
      { title: '重新编辑', desc: 'asd', callback: 'asd' },
      { title: '重新编辑' },
    ]
  },
  handleAction () {
    this.setData({ visiable: true })
  },
  asd (e) {
    console.log(e)
  },
  action ({ detail }) {
    console.log(detail)
  }
})