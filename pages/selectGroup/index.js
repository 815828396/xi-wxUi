// pages/selectGroup/index.js
Page({
  data: {
    selectTags: [1,2,3],
    cardGroup: [1,2,3],
    activeIndex: 1,
    isSelectF: true,
    isSelectS: false,
    isSelectT: false,
  },
  // 切换卡片
  checkoutCard(e) {
    this.setData({ activeIndex: ++this.data.activeIndex });
  }
})