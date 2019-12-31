import behavior from '../../../utils/behaviors/behaviors';
Component({
  externalClasses: ["xi-class"],

  behaviors: [behavior],

  pageLifetimes: {
    show () {
      this._init();
      console.log(this.data.yearDiff);
    }
  },
  
  properties: {
    visiable: Boolean,
    // 年份差值
    yearDiff: {
      type: Number,
      value: 10
    },
    // 起始时间
    startTime: String,
    endTime: String,
    // 返回形式
    type: {
      type: String,
      value: 'yyyy-mm-dd'
    }
  },

  data: {
    year: [],
    // 总数
    months: 12,
    days: 28,

    // 缓存日期数组索引
    // 用于判断 每次修改值是否
    keep_live_value: []
  },

  methods: {
    _init () {
      // Get base Date info
      const Time = new Date();
      const today_year = Time.getFullYear();
      const today_month = this.addZero(Time.getMonth() + 1);
      const today_date = this.addZero(Time.getDate());

      // Get start_time And end_time
      // Or Default_custom value
      const start_time = this.data.startTime || (today_year - this.data.yearDiff);
      const end_time = this.data.endTime || (today_year + this.data.yearDiff);

      // Get the index of the current year
      const _year_index = this.insertYear(start_time, end_time).indexOf(today_year);

      this.setData({
        days: this.getDaysBymonth(today_year, today_month),
        keep_live_value: [_year_index, today_month - 1, today_date - 1]
      })
    },
    pickerChange ({ detail }) {
      const [y_index, m_index] = detail.value;
      const days = this.getDaysBymonth(this.data.year[y_index], m_index + 1);

      this.setData({ days, keep_live_value: detail.value });
    },
    sureChange () {
      const {years} = this.data;
      const [y, m, d] = this.data.keep_live_value;
      this.setData({ visiable: false });
      this.trigger('change', {
        ...this.returnPro(),
        date: {
          year: years[y],
          month: this.addZero(m + 1),
          day: this.addZero(d + 1)
        }
      })
    },
    // 获取当年当月有多少天
    getDaysBymonth (year, month) {
      return (new Date(year, month, 0).getDate());
    },
    addZero (num) {
      return Number(num) >= 10 ? num : '0' + num;
    },
    // 设置月和日
    updateMonth_Day (m, d) {
      this.setData({
        months: m,
        days: d,
      });
      return this;
    },
    // 设置年份
    insertYear (s, e) {
      let years = [];
      let i = s;
      for (i; i < e; i ++) {
        years.push(i);
      }
      this.setData({ year: years });
      return years;
    }
  }
})
