
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
    currentIndex: 0
  },

  methods: {
    updCurrent(current) {
      this.setData({ currentIndex: current });
    }
  }
})
