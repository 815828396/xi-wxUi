import { getMonthDays } from '../../../utils/util';
import behavior from '../../../utils/behaviors/behaviors';

Component({

  externalClasses: ["xi-class"],
  behaviors: [behavior],
	options: {
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },

  properties: {
		// 天数的范围，默认5天
		diffDays: {
			type: Number,
			value: 5
		},
		// 渲染天数单位
		unit: String,
		show: Boolean,
		title: String,
		pickerIndex: {
			type: Array,
			value: [0, 0, 0]
		},
		// 是否自定义渲染 列表，默认自定义的
		custom: Boolean,
		timeDays: null,
		timeHours: null,
		timeMinutes: null,
  },
  data: {
		_pickerValue: [],
		_year: '',
		_month: ''
  },
  lifetimes: {
    attached() {
			if (!this.data.custom) {
				const currentTime = new Date(Number(getApp().globalData.userInfo.timestr + '000'));
				const _month = currentTime.getMonth() + 1;
				const _date = currentTime.getDate();
				const daysByMonth = getMonthDays(currentTime.getYear(), _month);
				const diffDays = daysByMonth - _date;
				let _timeData = [];
				for (let i = 0; i <= this.data.diffDays; i++) {
					const _m = diffDays - i > -1 ? _month : (_month == 12 ? 1 : _month + 1);
					const _d = diffDays - i > -1 ? _date + i : i - diffDays ;
					const _render = i == 0 ? '今日' : (i == 1 ? '明日' : `${_m}${this.data.unit || '.'}${_d}`);
					_timeData.push({ render: _render, date: `${_m}${this.data.unit || '.'}${_d}`})
				}	
				this.setData({ timeDays: _timeData, timeHours: 24, timeMinutes: 60 });
				// this.setData({ pickerIndex: this.data.pickerIndex });
				this._setPicker(this.data.pickerIndex);
			}
    }
  },
  methods: {
		_setPicker(value) {
			const [day, hour, minute] = value;
			this.data._pickerValue[0] = this.data.timeDays[day].date;
			this.data._pickerValue[1] = hour > 10 ? hour : '0' + hour;
			this.data._pickerValue[2] = minute > 10 ? minute : '0' + minute;
		},
		handleChange({ detail: { value } }) {
			this.data.pickerIndex = value;
			this._setPicker(value);
		},
		// 确定按钮
		handlePopupBtn({ currentTarget: { dataset: { tag } } }) {
			if (tag === 'confirm') {
				this.trigger('confirm', { value: this.data._pickerValue, index: this.data.pickerIndex });
				this.setData({ show: !this.data.show });
			} else {
				this.setData({ show: !this.data.show });
			}
		},
  }
})
