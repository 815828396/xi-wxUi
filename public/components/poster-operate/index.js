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

  properties: {

  },
  data: {
    ...def_options
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

      switch (target) {
        case 'wenben':
          this.setData({ visiableEditorText: true });
          break;
      }
    },
    // 文本输入
    handleInput({ detail }) {
      this.data.value = detail.value;
    },
    // 取消按钮
    cancel(e) {
      const target = e.currentTarget.dataset.target;

      this.setData({ [target]: false, ...def_options });
    },
    // 确认按钮
    confirm(e) {
      if (!this.data.value) {
        alert._showToast({ title: '请插入文本!' });
        return;
      };

      const parent = this.getRelationNodes(relation_parent_url)[0];
      parent.updCanvasText({
        value: this.data.value,
        color: this.data.color,
        size: this.data.size
      });

      this.setData({ visiableEditorText: false, ...def_options });
    }
  }
})
