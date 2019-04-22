/**
 * 关联组件 behaviors
 */
export default Behavior({
  data: {
    childNodes: {}
  },
  ready () {
    this._initRelationData();
  },
  methods: {
    // 获取父组件和子组件挂载到 data 中
    _initRelationData() {
      this.data.parent = this.getRelation(this.data.relation_parent) || "";
      this.data.childs = this.getRelation(this.data.relation_child) || "";
    },
    // compoentntUrl 组件间的相对文件路径
    getRelation (componentName) {
      return this.getRelationNodes(`../${componentName}/index`);
    },
    throwError(name) {
      console.warn(`Data: 中未找到变量对应的 ${name} 组件名称`);
    }
  }
})   