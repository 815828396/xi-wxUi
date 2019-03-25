import behavior from '../../../utils/behaviors/behaviors';
import relations from '../../../utils/behaviors/relations';

const relations_child_url = '../step/index';

Component({
  relations: {
    [relations_child_url]: {
      type: 'child',
      linked (target) {
        // console.log(target)
      }
    }
  },
  externalClasses: ["xi-class"],

  behaviors: [behavior, relations],

  properties: {
    // 显示的索引
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
    component_name: 'step'
  },
  methods: {
    _updateCurrent () {
      const childs = this.getChildNodes(this.data.component_name);
      console.log(childs);
    }
  }
})
