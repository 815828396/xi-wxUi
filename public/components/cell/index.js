import behavior from '../../../utils/behaviors/behaviors'
import { qs } from '../../../utils/util';
import { $router } from '../../../utils/wxUntil'

Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ['xi-class'],

  behaviors: [behavior],

  properties: {
    icon: String,
    border: String,
    cellType: String,
    title: String,
    label: String,
    // 链接功能
    router: String,
    query: Object,
    isLink: {
      type: null,
      value: ''
    },
    // input
    value: String,
    inputType: String,
    inputPlaceholder: String,
    // switch
    switchChecked: Boolean
  },
  data: {

  },
  methods: {
    // 跳转路由
    handleClick () {
      this.trigger('click', { ...this.returnPro() });

      if (!this.data.isLink) return;

      const { router, query } = this.data;

      $router(this.data.router, qs.stringify(router, query));
    },
    // switch 选项
    handleSwitch (e) {
      const value = e.detail.value;
      this.trigger('switch', {
        ...this.returnPro(),
        value
      })
    }
  }
})
