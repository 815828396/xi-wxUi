import behavior from '../../../utils/behaviors/behaviors'
import { $get } from '../../../assets/js/fetch/fetch'

const env_provice = 'Login/getProvince';
const env_city = 'Login/getCity';
const env_area = 'Login/getCity';

Component({

  behaviors: [behavior],

  externalClasses: ["xi-class"],

  properties: {
    // 默认展示值
    provinceText: String,
    cityText: String,
    areaText: String,

    // 省市区层级
    zIndex: {
      type: String,
      value: 3
    }
  },

  data: {
    // 优先展示默认传入值
    isDefault: false,

    // Is show Picker
    visiable: false,

    // picker列表数据
    pickerList: [],
    value: [],

    // 省市区数据
    province: [],
    city: [],
    area: [],
    // 省市区索引值
    index: [0, 0, 0]
  },

  ready () {
    this.data.isDefault = this.data.provinceText && this.data.cityText && this.data.areaText;
    this._initProvince();
  },
  methods: {
    handlePickerView ({ detail }) {
      this.setData({ visiable: true, isDefault: false });
    },
    pickerChange ({ detail }) {
      const _index = detail.value[0];

      // 用于：获取城市时的赋值
      this.data.index = [_index, 0, 0];
      this._initCity();

      // 用于：修改picker-view时的赋值
      this.setData({ index: detail.value });
    },
    // 获取省份数据
    _initProvince () {
      $get(env_provice).then(res => {
        this.setData({ province: res.data });

        // 首次加载,自动获取城市信息数据
        if (this.data.index[0] === 0) this._initCity();
      });
    },
    // 根据省份ID获取市级数据
    _initCity () {
      const pro_id = this.data.province[this.data.index[0]].id;
      const id = this.data.isDefault
              && this.data.provinceText
              && this.updPickerData('province', 'name', 0)
              || pro_id;
      const data = { id };
      
      $get(env_city, data).then(res => {
        this.setData({ city: res.data });

        this._initArea();
      });
    },
    // 根据市区ID获取地区数据
    _initArea () {
      const _city = this.data.city[this.data.index[1]];
      // 防止：当前省份中城市的索引值, 在新省份的城市中不存在索引而报错
      // 如： 河北：(石家庄[0],唐山[1]) =》 北京：(北京市[0])
      const city_id = _city && _city.id || this.data.city[0].id;
      const id = this.data.isDefault
              && this.data.cityText
              && this.updPickerData('city', 'name', 1)
              || city_id;
      const data = { id };

      $get(env_area, data).then(res => {
        this.setData({ area: res.data });

        this.data.isDefault && this.updPickerData('area', 'name', 2);
      })
    },
    /**
     * 修改picker-view数据
     * @param {String} arrKey 当前数组在data中的字符串名字
     * @param {String} key 匹配数组中的 Key 值
     * @param {Number} _index 需要修改的 index 中的索引值
     */
    updPickerData (arrKey, key, _index) {
      const { item, index } = this.findItem({
        array: this.data[arrKey],
        key: key,
        val: this.data[`${arrKey}Text`]
      });

      // 设置 页面地区文字动态改变
      this.data.index[_index] = index;
      this.setData({ index: this.data.index });

      return item.id;
    }
  }
})
