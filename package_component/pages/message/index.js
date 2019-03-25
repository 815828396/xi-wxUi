import { $Message } from '../../../utils/uiBase'
Page({

  data: {

  },

  onLoad: function (options) {

  },

  showMessage ({ detail }) {
    $Message({ type: detail.target, content: '这是message 组件内容' })
  }
})