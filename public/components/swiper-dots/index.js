
const relation_parent_url = '../swiper/index';

Component({
  relations: {
    [relation_parent_url]: {
      type: 'parent',
      linked (target) {
      },
    }
  },
  
  properties: {

    dotsType: {
      type: String,
      value: 'square'
    }
  },

  data: {
    dots: 5,
    currentIndex: 0,
    // pie指针动画时间, swiper默认5s切换
    duration: 5
  },

  methods: {
    // 渲染dots 指针数量
    initDots(dots) {
      this.setData({ dots: dots });
    },
    /**
     * 修改属性
     * @param {Number} current 展示的指针索引
     * @param {Number} duration 动画时间
     */
    updCurrent(current, duration) {
      this.setData({ 
        currentIndex: current,
        duration: duration
      });
      return this;
    }
  }
})
