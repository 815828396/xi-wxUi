// pages/papaw/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: [
      { Q: '无法跳转购买页面q1?', A: '请重新启动小程序尝试!' },
      { Q: '无法跳转购买页面q2?', A: '请重新启动小程序尝试!' },
      { Q: '无法跳转购买页面q3?', A: '请重新启动小程序尝试!' }
    ],
    arr: [
      { pos: 'left', val: '有什么问题需要咨询q1', fnVal: [{Q: '这是内容问题', A: 'q1'}, {Q: '这是内容问题'}, {Q: '这是内容问题'}] },
      { pos: 'right', val: '有什么问题需要咨询q2' },
      { pos: 'left', val: '有什么问题需要咨询q3', fnVal: [{Q: '这是内容问题', A: 'q2'}, {Q: '这是内容问题'}, {Q: '这是内容问题'}] },
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
  },
  onFn ({ detail }) {
    const answer = (function () {
      const { obj, fnIndex } = detail;
      return  fnIndex === -1 ? obj.A : obj.fnVal[fnIndex].A;
    }())
    this.data.arr.push({ pos: 'left', val: answer });
    this.setData({
      arr: this.data.arr
    })
    console.log(detail);
  }
})