
Component({

  externalClasses: ["xi-class"],

  properties: {
    // loading style
    // default: 弱加载 适合操作按钮等加载
    // bubble : 气泡 适合大规模局部加载或页面加载
    // page   : 适合局部加载或页面加载
    type: {
      type: String,
      value: 'default'
    }
  },
  data: {

  },
  methods: {

  }
})
