import behavior from '../../../utils/behaviors/behaviors'
let __default = {
  content: '',
  type: 'default',
  duration: 2,
  visiable: false
};
let timer = null;
Component({

  externalClasses: ["xi-class"],

  behaviors: [behavior],

  pageLifetimes: {
    show () {
      console.log('zhanshi')
    },
    hide () {
      console.log('隐藏')
    }
  },

  data: {
    ...__default
  },
  methods: {
    show (options) {
      const { type = 'default', duration = 2 } = options;
      
      this.setData({
        ...options,
        visiable: true,
        type,
        duration
      });

      const __duration = this.data.duration * 1000;

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        this.hide();
      }, __duration);
    },
    hide () {
      this.setData({ ...__default });
    }
  }
})
