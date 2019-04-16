import behaviors from '../../../utils/behaviors/behaviors';
import relations from '../../../utils/behaviors/relations';
const relations_canvas_url = "../poster-canvas/index";
const relations_operate_url = "../poster-operate/index";
Component({

  behaviors: [behaviors, relations],

  relations: {
    [relations_canvas_url]: {
      type: 'child',
      linked() {
        console.log('画布组件齐全')
      }
    },
    [relations_operate_url]: {
      type: 'child',
      linked() {
        console.log('操作组件齐全')
      }
    }
  },
  properties: {

  },
  data: {
    canvasComponent: {},
    operateComponent: {}
  },

  ready() {
    this.data.canvasComponent = this.getRelationNodes(relations_canvas_url)[0];
  },

  methods: {
    // 插入文本
    insertCanvasText(options) {
      this.data.canvasComponent.initText(options);
    },
    // 插入图片
    insertCanvasImg(options) {
      
      const path = options.path;
      if (typeof path === 'string') {
        this.data.canvasComponent.initImage(path);
      }
      else {
        let length = path.length;
        for (let i = 0; i < lenght; i ++) {
          this.data.canvasComponent.initImage(path[i]);
        }
      }
    },
    // 通过数组标识索引值来删除 对应的数据
    deleteCanvasByIndex(index) {
      // doing...
    }
  }
})
