import { alert, $privew, $getImageInfo } from '../../../utils/wxUntil';
import behavior from '../../../utils/behaviors/behaviors';

Component({

  externalClasses: ["xi-class"],
  behaviors: [behavior],

  properties: {
    // Upload the image to service side
    // Default: cannot upload
    uploadUrl: String,

    // Pictures cannot be update
    // Default: can update
    cannotUpdate: null,

    // Add WaterMark for picture
    addWaterMark: null,

    // Zoom the image to privew
    // Default: cannot zoom
    zoom: null,

    // Choose Picture condition
    count: String,
    sizeType: Array,
    sourceType: Array,

    // Image's description
    label: String,
    privewImagePath: String,
    imageSize: {
      type: String,
      value: 'max'
    },
    defaultSrc: {
      type: String,
      value: '../../assets/images/upload-image.png'
    },
    icon: {
      type: 'String',
      value: 'i-jia'
    }
  },
  data: {
    uploadImagePath: "",
    progress: 0,
    canvasWidth: '',
    canvasHeight: '',
    ctx: ''
  },
  lifetimes: {
    attached() {
      if (this.data.addWaterMark) this.data.ctx = wx.createCanvasContext('canvas', this);
    }
  },
  methods: {
    
    // 添加水印
    _addWaterMark(path, width, height) {
      this.data.iscanvas = true;
      this.data.ctx.drawImage(path, 0, 0, width, height);
      this.data.ctx.setFontSize(20)
      this.data.ctx.setStrokeStyle('rgba(255, 255, 255, .3)');
      '仅限仲达公司系统业务专用'.split('').forEach((item, i) => {
        this.data.ctx.setShadow(-5, 5, 2, 'black')
        this.data.ctx.strokeText(item, 30 + i * 24, height / 2 - 30)
      })
      '其他用途无效'.split('').forEach((item, i) => {
        this.data.ctx.setShadow(-5, 5, 2, 'black')
        this.data.ctx.strokeText(item, 30 + i * 24, height / 2 + 50)
      })
      // 绘制完成保存图片
      this.data.ctx.draw(true, () => {
        const { canvasHeight, canvasWidth } = this.data;
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: canvasWidth,
          height: canvasHeight,
          destWidth: canvasWidth,
          destHeight: canvasHeight,
          canvasId: 'canvas',
          success: res => {
            this.setData({ uploadImagePath: res.tempFilePath });
            wx.hideLoading();
            this.triggerEvent('upload', {
              ...this.returnPro(),
              path
            });
          },
          fail: err => {
            console.log(err)
          }
        }, this)
      });
    },
    handleChooseImage () {
      // Cannot to update picture, Auto-Click picture to Zoom
      if (this.data.privewImagePath && this.data.cannotUpdate && this.data.zoom) {
        $privew(this.data.privewImagePath);
        return;
      };

      // Choose picture
      this.chooseImage().then(path => {
        this.setData({ uploadImagePath: path });

        // Upload the picture
        if (this.data.uploadUrl) {
          this.uploadPicturl();
        }

        if (this.data.addWaterMark) {
          console.log('需要添加水印');
          $getImageInfo(path).then(({ path, width, height }) => {
            wx.showLoading({ title: '正在绘制水印', mask: true });
            const _x = Math.min(width, 375);
            const dix = _x / width;
            this.setData({ canvasWidth: _x, canvasHeight: height * dix });
            this._addWaterMark(path, this.data.canvasWidth, this.data.canvasHeight);
          })
          return;
        }

        this.triggerEvent('upload', {
          ...this.returnPro(),
          path
        });
      })
    },

    handleZoomImage () {
      if (!this.data.privewImagePath && !this.data.uploadImagePath) {
        alert._showToast({ title: '未找到可预览图片！' });
        return;
      }
    },

    // upload picture to service side
    uploadPicturl () {
      const uploadTask = wx.uploadFile({
        url: this.data.uploadUrl,
        filePath: this.data.uploadImagePath,
        name: "image",
        success: res => {
          console.log(res);
        }
      });
      // 终止上传
      // uploadTask.abort();

      // Listen Upload Task
      uploadTask.onProgressUpdate(pro => {
        this.setData({
          progress: pro.progress
        })
        if (pro.progress === 100) {
          setTimeout(() => {
            this.setData({ progress: 0 });
          }, 1200)
        }
      });
    },

    chooseImage () {
      const opt = (() => {
        const { count, sizeType, sourceType } = this.data;
        return {
          count: count || 1,
          sizeType: sizeType.length === 0 ? ['original', 'compressed'] : sizeType,
          sourceType: sourceType.length === 0 ? ['album', 'camera'] : sourceType
        }
      })();

      const { count, sizeType, sourceType } = opt;
      const _COUNT = Number(count);
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: _COUNT,
          sizeType: sizeType,
          sourceType: sourceType,
          success(res) {
            
            // Limit Picture Size
            const limitImg = (function () {
              let { path, size } = res.tempFiles[0];
              return /\.(jpg|png|jpeg)+$/.test(path) && size < (1024 * 1024 * 2);
            } ())

            // 不符合图片规则
            if (!limitImg) {
              alert._showToast({ title: '请上传png, jpg, jpeg格式图片!', duration: 5000 });
              return;
            };
            resolve(_COUNT > 1 ? res.tempFilePaths : res.tempFilePaths[0]);
          }
        })
      })
    },

  }
})
