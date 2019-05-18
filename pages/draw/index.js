
import { getSelectorAttr, getScrollViewFixedTop } from '../../utils/wxUntil.js'
// pages/draw/index.js
Page({

  data: {
    scrollHeight: 0,
    isScroll: true,
    canMove: true,

    startY: 0,

    // 
    opacity: 0,
    duration: 20,
    maxPosY: 200,
    trsY: -100,
    originTransY: -100,
  },

  onLoad() {
    // getScrollViewFixedTop('#drawer').then(res => {
    //   const {interfereHeight, dpr, clientHeight} = res;
    //   this.setData({ scrollHeight: clientHeight * dpr - interfereHeight * dpr })
    // });

    // 动态计算 抽屉的高度 并进行隐藏
    // getSelectorAttr({ property: 'height' }, '#drawer').then(hei => {
    //   this.setData({ trsY: ~hei });
    // })
  },
  vIBrate() {
    wx.vibrateShort()
  },
  top() {
    this.setData({ isScroll: false })
  },
  handleUpper() {
    console.log('禁止 页面滚动')
    this.setData({ isScroll: true, canMove: true });
  },
  scrollListener({ detail }) {
    if (this.data.timer) clearTimeout(this.data.timer);

    this.data.timer = setTimeout(() => {
      if (detail.scrollTop > 5 && this.data.canMove) {
        console.log('不可下拉')
        this.setData({ canMove: false });
      } else if (detail.scrollTop < 5 && !this.data.canMove) {
        console.log('可以下拉')
        this.setData({ canMove: true })
      }
      // console.log(detail.scrollTop)
    }, 20)


  },
  onOpenObserver(e) {
    this.setData({ isScroll: !e.open });
  }
  // handleStart(e) {
  //   const touches = e.changedTouches[0];
  //   this.data.startY = touches.pageY;

  //   // TODO: 是否在最顶部 并进行一下操作计算， 如果不是在最顶部不计算
  // },
  // handleMove(e) {

  //   // TODO: 当 cantMove 为 true 时候，不允许进行 move 事件的触发
  //   const touches = e.changedTouches[0];
  // }
})