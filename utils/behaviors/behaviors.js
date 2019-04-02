/**
 * 通用 beavior 
 */
export default Behavior({
  properties: {
    target: String,
    dataSet: Object
  },
  methods: {
    // 返回 组件的 标识名称和自定义对象
    returnPro () {
      return {
        target: this.data.target || '', 
        dataSet: this.data.dataSet || {}
      }
    },
    // 获取页面数据, 默认当前页(0 || 1)  上一页(2) 依次累加
    getPage (current = 0) {
      const pages = getCurrentPages();
      return pages[pages.length - (current ? current : 1)];
    },
    // 提交事件
    trigger (event, arg) {
      this.triggerEvent(event, arg);
    },
    /**
     * 查找数组中对应中的值
     * @param {Array} array 查找的数组
     * @param {String} key 数组对象中的 Key
     * @param {String} val 数组对象中 Val
     * @returns {Object} [item: 符合条件的对象, index: 索引值]
     */
    findItem ({ array, key, val }) {      
      let _index, _item;

      array.forEach((item, index) => {
        if (item[key] === val) {
          _index = index;
          _item = item;
        }
      });
      
      return { item: _item, index: _index }
    }
  }
})
