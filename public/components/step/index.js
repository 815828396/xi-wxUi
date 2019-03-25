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

  },

  ready () {
    // this._parent();
  },

  data: {
    component_name: 'steps'
  },

  methods: {

  }
})
