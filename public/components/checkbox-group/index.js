import relations from "../../../utils/behaviors/relations";
import behavior from "../../../utils/behaviors/behaviors";

const relation_child = '../checkbox/index';
Component({
  relations: {
    [relation_child]: {
      type: 'child',
      linked(target) {
        this._initCheckbox(target);
      },
      linkChanged (target) {
        this._initCheckbox(target);
      },
      unlinked (target) {
        this._initCheckbox(target);
      }
    }
  },
  externalClasses: ['xi-class'],

  behaviors: [relations, behavior],

  properties: {
    // 限制数量,
    isLimit: null,
    limit: Number,
    // checkbox 形状 
    checkboxType: {
      type: String,
      value: 'square'
    }
  },
  data: {
    relation_child: 'checkbox',
    value: []
  },
  methods: {
    _initCheckbox(target) {
      target.setData({ 
        type: this.data.checkboxType
      });
    },
    updCheck() {
      const childs = this.getRelation(this.data.relation_child);
      const value = childs.filter(item => item.data.checked)
      .map(e => e.data.value);

      // 开启 限制个数,并且超出了个数
      if (this.data.isLimit && (value.length + 1 > this.data.limit)) {
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < childs.length; j ++) {
            // 如果匹配到
            if (childs[j].data.value === value[i]) {
              childs[j].setData({ isLimit: false });
            } else {
              // 利用 boolean 值来判断,当前的isLimit 值，是否是本次动态修改的值
              // 如果本次循环修改的值为boolean 类型
              // 否则为 null
              if (typeof childs[j].data.isLimit === 'boolean') continue;
              childs[j].setData({ isLimit: true });
            }
          }
        }
      } 
      // 开启了限制个数,并且没有超出个数,重新可选择所有
      // 加判断是为了优化 未开启 isLimit 时候 不进行循环
      else if (this.data.isLimit && (value.length + 1 <= this.data.limit) ) {
        childs.map(item => item.setData({ isLimit: null }));
      }
      this.trigger('change', value);
    },
    findAll(value, childs) {
      return childs.findIndex(item => item.data.value === value);
    }
  }
})
