Page({
  data: {},
  onLoad() {
    this.data.calendarComponent = this.selectComponent('#calendar');
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
  }
})