import {getMonthDays, getMonthFirstDay} from '../../../utils/util';
import behavior from '../../../utils/behaviors/behaviors'

Component({
  externalClasses: ['xi-class'],
  behaviors: [ behavior ],
  options: {
    pureDataPattern: /^_/,
    multipleSlots: true
  },
  properties: {
    division: Array,
    // 缩略日历，只展示当前日期行
    scale: Boolean,
    thame: String, // 默认 Light   Dark
    // 日历渲染数组
    calendarRender: Array
  },

  data: {
    // 系统的年月日不会随着日历渲染改变
    _today: '',
    _todayYear: '',
    _todayMonth: '',
    _todayDate: '',
    // 年月 天数
    _firstDay: '',
    _date: '',
    _year: '',
    _lastYear: '',
    _prevYear: '',
    _month: '',
    _lastMonth: '',
    _prevMonth: '',
    isLoading: true,
    // 当前日期所在的行数索引
    currentI: -1,
    // 当前点击日期
    currentDate: '',
    isClick: false,
    division: [],
    calendarTitle: ['日', '一', '二', '三', '四', '五', '六'],
    // 二维数组, [[],[],...]
    // 子项数组：    共 6 个
    // 子项数组对象：{val: '主渲染日期', text: '主渲染文字描述,如果有text 不显示val字段，但是val为(data-val)时间获取值', desc: '下方文字' bgClasses: '背景class', logClass: '圆点class'}
    calendarRender: [[], [], [], [], [], []],
  },
  lifetimes: {
    attached() {
      this.data._today = new Date();
      this.data._todayYear = this.data._today.getFullYear();
      this.data._todayMonth = this.data._today.getMonth() + 1;
      this.data._todayDate = this.data._today.getDate();
      this.data._date = this.data._today.getDate();
      this.initRender(new Date().getFullYear(), new Date().getMonth() + 1);
    }
  },
  methods: {
    /**
     * 初始化渲染日历
     * @param {Number} year 年份
     * @param {Number} month 月份
     * @param {Number} reg 备份参数： clickData： 用户点击了某一日
     */
    initRender(year, month) {
      // this.loading(true);
      this._setMonthInfo(year, month);
      this._renderCalendar();
    },
    /**
     * 加载渲染日历动画
     * @param {Boolean} bool 是否加载动画 
     */
    loading(bool) {
      this.setData({ isLoading: bool })
    },
    /**
     * 查找二维数组中某个值的位置
     * @param {Array} arr 二维查找数组 如：[[1, 2, 3], [5, 6, 7]]
     * @param {Number} val 查找值 3
     * @return f: val在二维数组中某一项的的索引位置 例子：0
     *         s: val在数组中的索引位置             例子：2
     */
    _selectVal(arr, val) {
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
     * 根据传入的年月，获取对应的天数以及上下年月
     * @param {Number} year 年份
     * @param {Number} month 实际月份
     */
    _setMonthInfo(year, month) {
      const { _isLessYear, _isMoreYear } = this._isCriticalMonth(month);
      // 获取
      let [lastMonth, prevMonth] = [_isLessYear ? 12 : month - 1, _isMoreYear ? 1 : month + 1];
      let [lastYear, prevYear] = [_isLessYear ? year - 1 : year, _isMoreYear ? year + 1 : year];
      let days = getMonthDays(year, month);
      let _firstDay = getMonthFirstDay(year, month);

      this.data._year = year;
      this.data._lastYear = lastYear;
      this.data._prevYear = prevYear;
      this.data._month = month;
      this.data._lastMonth = lastMonth;
      this.data._prevMonth = prevMonth;
      this.data._days = days;
      this.data._firstDay = _firstDay;

      // console.log(`服务器时间：${this.data._todayYear} - ${this.data._todayMonth}`);
      // console.log(`日历渲染 ${month} 月份有 ${days} 天，并且${month} 月 1 号是星期 ${_firstDay}(数组索引)`);
      // console.log(`上一月份：${lastYear}-${lastMonth}, 当前月份：${year}-${month}，下一月份：${prevYear}-${prevMonth}`);
    },
    // 渲染日历列表
    // 当传入
    _renderCalendar() {
      let calendarRender = [];
      const { _year, _date, _month, _days, _firstDay, _lastYear, _lastMonth, _todayYear, _todayMonth, _todayDate, currentDate  } = this.data;

      for (let i = 0; i < 6; i++)
      {
        calendarRender[i] = [];
        for (let j = 0; j < 7; j++)
        {
          let idx = i * 7 + j;
          // 判断 日期 是否在本月 有效值内
          // 如 本月31天 则： 小于0的为上一个月,  大于31的 为下一个月
          let _val = idx - _firstDay + 1; //计算日期
          let val = _val <= 0
            ? getMonthDays(_lastYear, _lastMonth) - (_firstDay - j - 1)
            : _val > _days
              ? idx - _days - _firstDay + 1
              : _val;
          // ignore == true 当前日期号不属于当前月份；呈现灰色状态
          let ignore = _val <= 0 || _val > _days;
          
          calendarRender[i][j] = { val, ignore };

          // 设置当天的背景块儿
          if (val === _date && !calendarRender[i][j].ignore && _todayYear == _year && _todayMonth == _month)
          {
            calendarRender[i][j].bgClasses = 'bgColor bg2 radiusAll';
            this.setData({ currentI: i });
          }
        };
      };
      // setTimeout(_ => this.setData({ calendarRender }), 5000)
      this.setData({ calendarRender });
      this.trigger('init', { 
        year: _year, month: _month, date: currentDate ? currentDate : _date, 
        todayInfo: { todayYear: _todayYear, todayMonth: _todayMonth, todayDate: _todayDate, }
      });
      // this.loading(false);
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
    /**
     * 设置区间内容函数
     * @param {Array} division 如： [[3,4], [7,8,9,10,11,12], [30, 31]];
     */
    rangeFunction(division = []) {
      let _division = division;
      // _selectVal函数，查找二维数组的次数
      let calc = 0;
      let calcTimes = _division.flat().length;
      let calendarRender = this.data.calendarRender;
      for (let i = 0; i < 6; i++)
      {
        let item = calendarRender[i];
        for (let j = 0; j < 7; j++)
        {
          let { val } = item[j];
          // 存在时间轴端 && 时间轴端已经查找完毕 division.flat() && 日期处于当前渲染月份中
          if (_division.length > 0 && calc !== calcTimes && !item[j].ignore)
          {
            const { f, s } = this._selectVal(_division, val);
            if (f >= 0 && s >= 0)
            {
              item[j].bgClasses = 'bg1';
              calc++;
              // 当前值在数组中的起始位置
              if (s == 0)
              {
                item[j].bgClasses += ' radius-left showDesc';
                item[j].desc = '开始';
              }
              // 当前值在数组中的结尾
              else if (s == division[f].length - 1)
              {
                item[j].bgClasses += ' radius-right showDesc';
                item[j].desc = '结束';
              }
              else
              {
                item[j].bgClasses += ' division-center';
              }
            }
          }
        }
      }
      this.setData({ calendarRender: calendarRender });
    },
    // 点击日历项目
    handleClickDate({currentTarget}) {
      const { val: value, ignore } = currentTarget.dataset;
      if (ignore) return;
      wx.vibrateShort()
      this.setData({currentDate: value});
      this.trigger('clickDate', { val: value });
    }
  }
})
