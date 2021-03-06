import relations from '../../../utils/behaviors/relations';
import { alert } from '../../../utils/wxUntil';
const relation_parent_url = '../poster/index';
const def_options = { value: '', path: '', color: 'black', size: '22' }
// 工具简介描述
const tip_icon = {
  'wenben': '插入文本',
  'yanse': '设置背景颜色',
  'scale': '设置缩放模式',
  'tupian': '插入图片',
  'huizhi': '开始绘制图片',
}
Component({
  behaviors: [relations],
  relations: {
    [relation_parent_url]: {
      type: 'parent',
      linked() {
        console.log('poster-operaet 操作器插入')
      }
    }

  },

  data: {
    ...def_options,
    parentComponent: "",
    // 滑动条设置
    sliderMin: 1,
    sliderMax: 5,
    sliderStep: 1,
    // 图片数量
    imgCount: 1,
    imgQuality: 0
  },

  ready() { 
    this.data.parentComponent = this.getRelationNodes(relation_parent_url)[0];
  },

  methods: {
    // 长按工具,查看简介
    privewBrief(e) {
      const target = e.currentTarget.dataset.target;
      alert._showToast({ title: tip_icon[target] });
    },
    // 点击工具按钮,触发对应效果
    handleClick(e) {
      const target = e.currentTarget.dataset.target;
      this.setData({ [`visiableEditor_${target}`]: true });
    },
    // 文本输入
    text_handleInput({ detail }) {
      this.data.value = detail.value;
    },
    // 文本取消按钮
    cancel(e) {
      const target = e.currentTarget.dataset.target;

      this.setData({ [`visiableEditor_${target}`]: false, ...def_options });
    },
    // 选择上传图片数量
    img_countSliderChange({ detail }) {
      this.data.imgCount = detail.value;
    },
    // 选择图片的尺寸 0 ： 原图 , 1 ： 压缩图
    img_qualityChange({ detail }) {
      this.data.imgQuality = detail.value;
    },
    // 文本确认按钮
    text_confirm(e) {
      if (!this.data.value) {
        alert._showToast({ title: '请插入文本!' });
        return;
      };

      const { value, color, size } = this.data;

      this.insertOptions('insertCanvasText', { value, color, size })
          ._initDefault('visiableEditor_wenben');
    },
    // 选择图片
    img_chooseImage() {
      wx.chooseImage({
        count: this.data.imgCount,
        sizeType: [this.data.imgQuality],
        success: opt => {
          const path = opt.tempFilePaths[0];
          this.insertOptions('insertCanvasImg', { path })
              ._initDefault('visiableEditor_tupian');
        }
      })
    },


    /**
     * 向父组件传递参数
     * @param {Function} fn 父组件执行函数名称
     * @param {Object} options 配置参数
     * @return {this} this 链式调用
     */
    insertOptions (fn, options) {
      this.data.parentComponent[fn](options);
      return this;
    },

    /**
     * 恢复默认函数
     * @param {String} is 需要隐藏的模态框名称
     */
    _initDefault(is) {
      this.setData({ [is]: false, ...def_options });
    }
  }
})
