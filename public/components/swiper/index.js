const relation_child_url = '../swiper-dots/index';

Component({

  options: {
    multipleSlots: true
  },

  relations: {
    [relation_child_url]: {
      type: 'child',
      linked (target) {
        this._initDots();
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
    swiperUrl: Array,
    swiperType: {
      type: String,
      value: 'image'
    }
  },

  data: {
    // 是否显示轮播指针
    dots: null,
  },

  methods: {
    // 计算 轮播指针数量
    _initDots() {
      console.log('正在计算轮播数量');
    },

    swiperChange({ detail }) {
      const { current } = detail;
      const child = this.getRelationNodes(relation_child_url)[0];
      child.updCurrent(current);
    }
  }
})
