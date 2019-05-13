import relations from "../../../utils/behaviors/relations";
import behavior from "../../../utils/behaviors/behaviors";

const relation_parent = '../checkbox-group/index';

Component({
  relations: {
    [relation_parent]: {
      type: 'parent',
      linked(target) {
        this._updData(target)
      }
    }
  },
  externalClasses: ['xi-class'],

  behaviors: [relations, behavior],

  properties: {
    value: String,
    label: String,
    checked: Boolean,
    disabled: Boolean
  },
  data: {
    relation_parent: 'checkbox-group',
    type: '',

  },
  ready() {
    // console.log(this.data)
  },
  methods: {
    handleClick(e) {
      if (this.data.disabled || this.data.isLimit) return;

      const { value } = e.currentTarget.dataset;
      this.setData({ checked: !this.data.checked, value });
      this.data.parent[0].updCheck()
    },
    _updData(target) {
      this.setData({ checked: this.data.checked, value: this.data.value || this.data.label });
      target.updCheck()
    }
  }
})
