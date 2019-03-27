import behavior from '../../../utils/behaviors/behaviors';
import relations from '../../../utils/behaviors/relations';

const relations_child_url = '../step/index';

Component({
  options: {
    multipleSlots: true
  },
  relations: {
    "../steps/index": {
      type: 'parent',
      lined (target) {
        console.log(target)
      }
    }
  },
  externalClasses: ["xi-class"],

  behaviors: [behavior, relations],

  properties: {
    icon: String,
    status: String,
  },

  data: {
    component_name: 'steps',
    // step的数量
    length: 1,
    // 当前step 的 索引值
    currentIndex: 0,
    // 激活状态索引
    activeIndex: 0,
    direction: 'horizontal'
  },

  methods: {

  }
})
