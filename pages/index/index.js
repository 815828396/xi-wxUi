//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navlist: [
      {
        url: 'dialog',
        title: 'dialog组件'
      }, {
        url: 'modal',
        title: 'modal组件'
      }, {
        url: 'action-sheet',
        title: 'action-sheet组件'
      }, {
        url: 'cell',
        title: 'cell组件'
      }, {
        url: 'message',
        title: 'mesage组件'
      }
    ]
  },
  onLoad: function () {
  }
  
})
