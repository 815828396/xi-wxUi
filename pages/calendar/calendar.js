Page({
  data: {
    isScale: false,
    logsList: [
      { lev: '优先完成', title: '仲达事业部开会', t: '9.30', s: 'AM', desc: '9点之前需要到达；总公司' },
      { lev: '正常', title: '去参加聚会', t: '12.30', s: 'PM' },
      { lev: '正常', title: '接孩子', t: '5.30', s: 'PM' }
    ],
    val: ''
  },
  onLoad() {
    this.data.calendarComponent = this.selectComponent('#calendar');
  },
  handleClick() {
    this.setData({ isScale: !this.data.isScale });
  },
  // calendar 组件切换月份事件
  handleCheckDate({ detail }) {
    let { year, month, handle } = detail;
    const currentMonth = handle === 'next' ? ++month : --month;
    if (currentMonth > 12) 
    {
      ++year;
      month = 1;
    }
    if (currentMonth <= 0) 
    {
      --year;
      month = 12;
    }
    this.data.calendarComponent.initRender(year, month);
  },
  // 跳转页面详情
  handleSkipDetail({ currentTarget: { dataset: { idx } } }) {
    const { title } = this.data.logsList[idx];
    wx.showToast({ title: `跳转新页面查看 “${title}” 的详情行程`, icon: 'none', duration: 3000 });
  },
  // 底部弹窗发布内容
  handleInsert() {
    wx.showToast({ title: '底部弹出窗口，填写简单信息', icon: 'none', duration: 3000 });
  },
  // 
  handleClickDate({ detail: { val } }) {
    const _val = Number(val);
    if (_val % 2 == 0) {
      this.setData({ logsList: [] });
    } else {
      this.setData({ logsList: [
        { lev: '优先完成', title: '仲达事业部开会', t: '9.30', s: 'AM', desc: '9点之前需要到达；总公司' },
        { lev: '正常', title: '去参加聚会', t: '12.30', s: 'PM' },
        { lev: '正常', title: '接孩子', t: '5.30', s: 'PM' }
      ] });
    }
    this.setData({ val: _val });
  }
})