import relations from '../../../utils/behaviors/relations';

const relation_child_url = '../swiper-dots/index';

Component({
  behaviors: [relations],

  options: {
    multipleSlots: true
  },

  relations: {
    [relation_child_url]: {
      type: 'child',
      linked (target) {
        this._initDots(target);
      },
    }
  },

  externalClasses: ["xi-class"],

  properties: {
    // 原生属性
    autoPlay: null,
    circular: null,
    previousMargin: String,
    nextMargin: String,
    duration: {
      type: Number,
      value: 500
    },
    interval: {
      type: Number,
      value: 5000
    },
    current: {
      type: Number,
      value: 0
    },

    // swiper 轮播类型,
    // 图片形式为简单轮播类型
    swiperUrl: null,
    swiperType: {
      type: String,
      value: 'image'
    },

    // 自定义布局插槽数量
    customSlot: Number,
  },

  data: {
    relation_child: 'swiper-dots',
    // 是否显示轮播指针
    showDots: null
  },
  methods: {
    // 计算 轮播指针数量
    _initDots(target) {
      target.updCurrent(this.data.current, this.data.interval / 1000)
            .initDots(this.data.swiperUrl || this.data.length);
    },

    // 轮播图切换事件
    swiperChange({ detail }) {
      const { current } = detail;
      this.data.childs[0].updCurrent(current, this.data.interval / 1000);
    }
  }
})
