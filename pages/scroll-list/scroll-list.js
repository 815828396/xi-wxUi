import regeneratorRuntime  from '../../utils/regenerator-runtime/runtime';
import {screenHeight} from '../../utils/wxUntil';
const $options = {
  vSize: 8,
  vHeight: '',
  nodeHeight: '',
}
Page({
  data: {
    ...$options,

    scrollHeight: 0,
    // 渲染数组列表
    renderList: [],
    // 实际数组列表
    realList: [],
  },

  onLoad() {
    this.initData();
  },
  
  async initData() {
    const renderList = await this._asyncData();
    // this.setData({renderList, realList: renderList});
    this.setData({renderList: renderList.slice(0, this.data.vSize), realList: renderList});
    this.promiseAll();

  },
  // 获取 可视屏幕高度 和 单个节点的高度
  // 数值属性全部 px 单位
  // $命名 为  微信获取属性
  async promiseAll() {
    let [$height, $nodes] = [0, []];
    try {
      $height = await screenHeight();
      $nodes = await this.getNodeInfo();
    } catch (error) {
      console.log(error);
    }

    // 获取节点数组中，第一个节点的高度， 和 屏幕的高度
    const [[{height: nodeHeight}], {height: vHeight}] = [$nodes, $height];
    // 可视化渲染 的数目
    const vSize = Math.ceil(vHeight / nodeHeight);

    this.data.vSize = vSize;
    this.data.vHeight = vHeight;
    this.data.nodeHeight = nodeHeight;
    this.data.vIdx = [0, vSize - 1];

    this.setData({scrollHeight: this.data.realList.length * nodeHeight});

    console.log(`当前屏幕 可视 ${vSize} 个数据, 屏幕 ${vHeight}px;  单项高度${nodeHeight}px`)

  },

  // 获取 起始 和 终点索引值
  calcIndex(scrollTop, nodeHeight, vSize) {
    const fi = Math.floor(scrollTop / nodeHeight);
    const li = fi + vSize - 1;
    return [fi, li];
  },

  // 获取节点信息
  getNodeInfo() {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery()
        .selectAll('.card')
        .boundingClientRect(res => resolve(res)).exec();
    })
  },
  // 模拟数据获取
  _asyncData() {
    let result = Array.from(new Array(200));
    return Promise.resolve(result);
  },


  onPageScroll({scrollTop}) {
    const [firstIdx, lastIdx] = this.calcIndex(scrollTop, this.data.nodeHeight, this.data.vSize);
    const [oFirstIdx, oLastIdx] = this.data.vIdx;
    // if () {

    // }
    // this.setData({renderList: this.data.realList.slice()})
    console.log(firstIdx, lastIdx);
  }
})