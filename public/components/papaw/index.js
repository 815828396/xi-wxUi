import behavior from '../../../utils/behaviors/behaviors'
const _default = {
  value: "",
  top: 1000
}
Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ['xi-class'],

  behaviors: [behavior],

  properties: {
    /**
     * 对话内容
     * @param {String} pos 定位位置 left: 左侧展示   right: 右侧展示
     * @param {String} val 文字内容
     * @param {Array} fnVal 问题数组 { Q, A }
     */
    papawCont: Array,
    /**
     * 初次渲染问题数组
     * @param {String} Q 问题
     * @param {String} A 答案
     */
    question: Array,
    // Default {header} {footer} Element
    header: String,
    footer: String,
    // headimg
    headImg: String,
    scrollHeight: {
      type: String,
      value: 1000
    }
  },

  data: {
    ..._default,
  },
  methods: {
    handleInput ({ detail }) {
      this.setData({ value: detail.value });
    },
    handleClick () {
      // triggerEvent: Input's value
      this.trigger('click', this.data.value);
      this.setData({ ..._default });
    },
    handleQuestion (e) {
      // qIndex : 聊天内容数组索引(papawCont) 和 初次渲染问题索引(question)
      // fnIndex: 聊天内容中 fnVal 问题索引
      const { qindex: qIndex, index: fnIndex = -1 } = e.currentTarget.dataset;
      const question_arr = this.data.question || [];
      const question = question_arr[qIndex] || "";

      if (question_arr.length > 0 && question) {
        // triggerEvent: 
        this.trigger('fn', {
          obj: fnIndex !== -1 ? this.data.papawCont[qIndex] : this.data.question[qIndex],
          fnIndex: fnIndex
        });

        this.setData({ ..._default });
      }
    },
  }
})
