// pages/papaw/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [
      { pos: 'left', val: '有什么问题需要咨询' },
      { pos: 'right', val: '有什么问题需要咨询' },
      { pos: 'left', val: '有什么问题需要咨询' },
      { pos: 'right', val: '有什么问题需要咨询有什么问题需要咨询' },
      { pos: 'left', val: '有什么问题需要咨询' },
    ],
    headImg: "../../../assets/images/artboard.png",
    val: ""
  },

  onLoad: function (options) {

  },
  handleInput (e) {
    this.setData({ val: e.detail.value })
  },
  handleClick () {
    this.arr.push({ pos: 'right', val: this.data.value });
  },
  hand ({ detail }) {
    this.data.arr.push({
      pos: 'right',
      val: detail
    })
    this.setData({ arr: this.data.arr })
    console.log(detail);
  }
})