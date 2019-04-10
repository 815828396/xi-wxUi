import behaviors from '../../../utils/behaviors/behaviors';
import relations from '../../../utils/behaviors/relations';
const relations_canvas_url = "../poster-canvas/index";
const relations_operate_url = "../poster-operate/index";
Component({

  behaviors: [behaviors, relations],

  relations: {
    [relations_canvas_url]: {
      type: 'child',
      linked () {
        console.log('画布组件齐全')
      }
    },
    [relations_operate_url]: {
      type: 'child',
      linked () {
        console.log('操作组件齐全')
      }
    }
  },
  properties: {

  },
  data: {

  },

  methods: {
    updCanvasText (options) {
      const canvas_component = this.getRelationNodes(relations_canvas_url)[0];
      canvas_component.inertText(options);
      console.log(options)
      console.log(canvas_component)
      // canvas_component.setData({

      // })
    }
  }
})
