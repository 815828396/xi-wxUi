import behaviors from '../../../utils/behaviors/behaviors';

Component({

  behaviors: [behaviors],

  externalClasses: ['xi-class'],

  properties: {
  },

  data: {
    visiable: false,
    content: "",
    center: false,
    btnText: "确定",
    // 动画效果， 默认普通 降落
    //          回弹效果: springBack
    //          做进又出
    transition: 'common'
  },

  methods: {
    show(options) {
      this.setData({
        ...options,
        visiable: true
      });
    },
    hide() {
      this.setData({ visiable: false });
    },
    // 按钮点击事件,提交给父组件用于监听函数
    btnClick() {
      this.trigger('onMessageCloseClick', {
        ...this.returnPro()
      })
    }
  }
})
