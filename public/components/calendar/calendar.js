import {getMonthDays, getMonthFirstDay} from '../../../utils/util';
Component({
  externalClasses: ['xi-class'],
  options: {
    pureDataPattern: /^_/
  },
  properties: {
    division: Array,
    thame: String // 默认 Light   Dark
  },

  data: {
    // 年月 天数
    _today: '',
    _firstDay: '',
    _todayYear: '',
    _todayMonth: '',
    date: '',
    year: '',
    lastYear: '',
    prevYear: '',
    month: '',
    lastMonth: '',
    prevMonth: '',
    division: [],
    calendarTitle: ['日', '一', '二', '三', '四', '五', '六'],
    // 二维数组, [[],[],...]
    // 子项数组：    共 6 个
    // 子项数组对象：{val, bgClasses, radius, ignore, radiusRight}
    calendarRender: [[], [], [], [], [], []],
  },
  lifetimes: {
    attached() {
      this.data._today = new Date();
      this.setData({date: this.data._today.getDate(), _todayYear: this.data._today.getFullYear(), _todayMonth: this.data._today.getMonth() + 1})
      this.initRender(new Date().getFullYear(), new Date().getMonth() + 1);
      // this.initRender(2020, 12);
    }
  },
  methods: {
    /**
     * 初始化日历时间
     * @param {Number} year 年份
     * @param {Number} month 月份
     */
    initRender(year, month) {
      this.setMonthInfo(year, month);
      this.renderCalendar();
    },
    // 渲染日历列表
    renderCalendar() {
      let calendarRender = [];
      let calc = 0;
      let division = [[3,4], [7,8,9,10,11,12]];
      for (let i = 0; i < 6; i++)
      {
        calendarRender[i] = [];
        for (let j = 0; j < 7; j++)
        {
          let idx = i * 7 + j;
          // 判断 日期 是否在本月 有效值内
          // 如 本月31天 则： 小于0的为上一个月,  大于31的 为下一个月
          let _val = idx - this.data._firstDay + 1; //计算日期
          let val = _val <= 0
            ? getMonthDays(this.data.lastYear, this.data.lastMonth) - (this.data._firstDay - j - 1)
            : _val > this.data.days
              ? idx - this.data.days - this.data._firstDay + 1
              : _val
          // ignore == true 当前日期号不属于当前月份；呈现灰色状态
          let ignore = _val <= 0 || _val > this.data.days;
          calendarRender[i][j] = { val, ignore };
          // 设置当天的背景块儿
          if (val === this.data.date && !calendarRender[i][j].ignore && this.data._todayYear == this.data.year && this.data._todayMonth == this.data.month)
          {
            calendarRender[i][j].bgClasses = 'bgColor bg2 radiusAll';
          }
          // 存在时间轴端 并且 时间轴端已经查找完毕 division.flat();
          if (division.length > 0 && calc !== division.flat().length)
          {
            const { f, s } = this.selectVal(division, val);
            if (f >= 0 && s >= 0)
            {
              calendarRender[i][j].bgClasses = 'activeHover';
              calc++;
              if (s == 0) 
              {
                calendarRender[i][j].bgClasses += ' radius-left';
              } 
              else if (s == division[f].length - 1)
              {
                calendarRender[i][j].bgClasses += ' radius-right';
              }
              else
              {
                calendarRender[i][j].bgClasses += ' division-center';
              }
            }
          }
        };
      };
      this.setData({ calendarRender });
    },
    /**
     * 查找二维数组中某个值的位置
     * @param {Array} arr 二维查找数组
     * @param {Number} val 查找值
     */
    selectVal(arr, val) {
      let f = -1, s = -1;
      for (let i = 0, l = arr.length; i < l; i++)
      {
        if (arr[i].indexOf(val) >= 0)
        {
          f = i;
          s = arr[i].indexOf(val);
          break;
        }
      };
      return { f, s };
    },
    /**
     * 设置年月信息
     * @param {Number} year 年份
     * @param {Number} month 实际月份
     */
    setMonthInfo(year, month) {
      const { _isLessYear, _isMoreYear } = this._isCriticalMonth(month);
      // 获取
      let [lastMonth, prevMonth] = [_isLessYear ? 12 : month - 1, _isMoreYear ? 1 : month + 1];
      let [lastYear, prevYear] = [_isLessYear ? year - 1 : year, _isMoreYear ? year + 1 : year];
      let days = getMonthDays(year, month);
      let _firstDay = getMonthFirstDay(year, month);

      this.setData({
        year, lastYear, prevYear,
        month, lastMonth, prevMonth,
        days, _firstDay
      })
      console.log(`服务器时间：${this.data._todayYear} - ${this.data._todayMonth}`);
      console.log(`日历渲染 ${month} 月份有 ${days} 天，并且${month} 月 1 号是星期 ${_firstDay}(数组索引)`);
      console.log(`上一月份：${lastYear}-${lastMonth}, 当前月份：${year}-${month}，下一月份：${prevYear}-${prevMonth}`);
    },
    /**
     * 判断传入月份 是否处于当年的跨年月
     * @desc 如果 当前月份 为 1月  日历上一月为 上一年十二月份，
     * @desc 如果 当前月份 为 12月  日历下一月为 下一年1月份，
     * @param {Number} month 1 - 12 月份
     * @return {Object} _isLessYear: 是否达到去年月份跨度， _isMoreYear: 是否达到次年月份跨度
     */
    _isCriticalMonth(month) {
      return { _isLessYear: month - 1 <= 0, _isMoreYear: month + 1 > 12 };
    },
    // 点击日历项目
    handleClickDate({currentTarget}) {
      const { val: value, ignore } = currentTarget.dataset;
      console.log(value, ignore)
      if (ignore === "true")
      {
        return;
      }
      wx.vibrateShort()
      this.setData({current: value});
    }
  }
})
