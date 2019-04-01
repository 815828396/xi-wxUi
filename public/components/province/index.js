import behavior from '../../../utils/behaviors/behaviors'
import { $get } from '../../../assets/js/fetch/fetch'

const env_provice = 'Login/getProvince';
const env_city = 'Login/getCity';
const env_area = 'Login/getCity';

Component({

  behaviors: [behavior],

  externalClasses: ["xi-class"],

  properties: {
    provinceText: String,
    cityText: String,
    areaText: String,
  },

  data: {
    // 优先展示默认传入值
    visiable: false,

    province: [],
    city: [],
    area: [],
    // 省市区索引值
    index: [0, 0, 0]
  },

  ready () {
    this._initProvince();
  },
  methods: {
    asd () {
      console.log(12);
    },
    handlePickerView ({ detail }) {
      this.setData({ visiable: true })
    },
    // 获取省份数据
    _initProvince () {
      $get(env_provice).then(res => {
        
        this.setData({ province: res.data });
        console.log(res)
      });
    },
    // 根据省份ID获取市级数据
    _initCity () {
      $get(env_city, data).then(res => {
        console.log(res)
      });
    },
    // 根据市区ID获取地区数据
    _initArea () {
      $get(env_area, data).then(res => {
        console.log(res)
      })
    }
  }
})
