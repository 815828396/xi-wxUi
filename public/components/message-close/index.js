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
    btnText: "确定"
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
