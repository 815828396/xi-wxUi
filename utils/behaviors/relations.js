/**
 * 关联组件 behaviors
 */
export default Behavior({
  data: {
    childNodes: {}
  },
  methods: {
    // compoentntUrl 组件间的相对文件路径
    getChildNodes (componentName) {
      return this.getRelationNodes(`../${componentName}/index`);
    }
  }
})