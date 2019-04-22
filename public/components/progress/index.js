// public/components/progress/index.js
Component({

  externalClasses: ["xi-class"],

  properties: {
    // 开启环形动画
    animation: null,
    // 环形动画时间
    pieDuration: {
      type: String,
      value: '5'
    },
    // 进度条类型， 
    // bar : 柱形 { Default }
    // pie : 环形
    // line: 线状
    progressStyle: {
      type: String,
      value: 'bar'
    },

    // 环形尺寸
    pieSize: {
      type: String,
      value: 'min'
    },

    // 底层颜色
    progressBgColor: {
      type: String,
      value: "#ccc"
    },
    // 颜色
    progressColor: {
      type: String,
      value: '#1EA0FF'
    },
    // 边框尺寸
    progressSize: {
      type: String,
      value: '3px'
    }
  },

  data: {

  },

  methods: {
    asd () {
      border = 'border' + sda +
        'asd';
    }
  }
})
