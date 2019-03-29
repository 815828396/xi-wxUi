import behavior from '../../../utils/behaviors/behaviors';
Component({
  options: {
    multipleSlots: true
  },

  // 可通过传入 类名来修改组件样式, 优先级较低, 需要自行处理
  externalClasses: ['xi-class'],

  behaviors: [behavior],

  properties: {
    
    visiable: Boolean,

    // 取消文本
    cancelText: String,

    actions: Array,
    desc: String
  },

  data: {
  },
  methods: {
    handleClose (e) {
      const { target } = e.target.dataset;

      if (target !== 'close') return;

      this.setData({
        visiable: false
      })

      this.triggerEvent('cancel')
    },
    handleItemClick (e) {
      const { disabled, callback, index } = e.currentTarget.dataset;

      if (disabled) return;

      if (!callback)
        this.trigger('action', {
          ...this.returnPro(),
          key: index
        })

        callback && this.getPage()[callback]({ 
          dataset: e.currentTarget.dataset,
          key: index
        });
    }
  }
})
