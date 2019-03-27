import behavior from '../../../utils/behaviors/behaviors'

Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ['xi-class'],

  behaviors: [behavior],

  properties: {
    // 对话内容： 格式 [{ pos, val, fn }]
    // pos: 定位位置  --- left： 左侧  right: 右侧
    // val: 文字内容
    // fn:  带有事件的对话框
    papawCont: Array,
    // 初次渲染问题 列表
    question: Array,
    // 默认使用组件自定义 头部和底部
    header: String,
    footer: String,
    // 标题头像图片
    headImg: String,
    scrollHeight: {
      type: String,
      value: 1000
    }
  },

  data: {
    value: "",
    top: 1000
  },
  methods: {
    handleInput ({ detail }) {
      this.data.value = detail.value;
    },
    handleClick () {
      this.trigger('click', this.data.value);
      this.setData({ value: "" , top: 1000});
    }
  }
})
