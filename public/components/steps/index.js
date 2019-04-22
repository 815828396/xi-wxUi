import behavior from '../../../utils/behaviors/behaviors';
import relations from '../../../utils/behaviors/relations';

const relations_child_url = '../step/index';

Component({
  relations: {
    [relations_child_url]: {
      type: 'child',
      linked (target) {
        this._updateCurrent(target);
      },
      linkChanged () {
        this._updateCurrent();
      },
      unlinked () {
        this._updateCurrent();
      }
    }
  },
  externalClasses: ["xi-class"],

  behaviors: [behavior, relations],

  properties: {
    // 当前显示的索引
    current: {
      type: Number,
      value: -1,
      observer: '_updateCurrent'
    },
    // 横向步骤展示：带有下一步功能   默认值 ：horizontal
    // 竖向模板展示：不带有下一步功能 vertical
    direction: {
      type: String,
      value: 'horizontal'
    }
  },
  data: {
    relation_child: 'step'
  },
  methods: {
    _updateCurrent () {
      const childs = this.getRelation(this.data.relation_child);
      const length = childs.length;
      if (
        this.data.direction === 'horizontal' && 
        length > 4
      ) console.warn('direction: horizontal - 属性模式推荐使用四个 ');
      if (childs.length === 0) return;
      
      childs.forEach((child, index) => {
        child.setData({
          currentIndex: index,
          activeIndex: this.data.current,
          direction: this.data.direction,
          length: length
        })
      });
    }
  }
})
