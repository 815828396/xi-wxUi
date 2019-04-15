
import behaviors from '../../../utils/behaviors/behaviors';
import relations from '../../../utils/behaviors/relations';
const relation_parent_url = '../poster/index';
// 默认配置
const default_common = { x: '', y: '' };
const default_wenben = { value: '', size: 22, color: 'black' };
const default_image = { path: '', width: '', height: '' };
Component({
  behaviors: [behaviors, relations],
  relations: {
    [relation_parent_url]: {
      type: 'parent',
      linked () {
        console.log('poster-canvas 插入')
      }
    }
  },

  properties: {

  },

  data: {
    ...default_common,
    ...default_wenben,
    ...default_image,
    /**
     * canvas 内容配置
     * {
     *    type  : text / image, 图片或文字
     *    value : 内容文字
     *    size  : 文字尺寸
     *    color : 文字颜色
     *    direction : vertical / horizontal 文字方向
     * 
     *    path  : 图片路径
     * }
     */
    canvasOptions: [],
  },
  methods: {
    initText(options) {
      let { value, size, color } = options;
      let canvasOptions = this.data.canvasOptions;
      canvasOptions.push({
        type: 'text',
        value, size, color
      })
      this.setData({ canvasOptions });
      // this.data.
    },

    // 
    initImage() {

    },

    /**
     * 监听元素双指缩放事件
     * @param {Object} detail 缩放比例尺寸信息
     */
    onScale({ detail }) {
      const { x, y, scale } = detail;
      console.log(x, y, scale);
    },
    
    /**
     * 监听元素拖动事件
     * @param {Object} e 事件源
     */
    onChange(e) {
      const { x, y, source } = e.detail;

      // 移动超出界限删除当前元素
      if (source.indexOf('bounds') > 0) {
        this.setData({ is: true });
        return;
      } 

      console.log(x, y, source);
    }
  }
})
