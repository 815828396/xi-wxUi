import behavior from '../../../utils/behaviors/behaviors';
import relation from '../../../utils/behaviors/relations';
import { alert, $privew } from '../../../utils/wxUntil';

Component({

  externalClasses: ["xi-class"],

  behaviors: [behavior, relation],

  properties: {
    // Upload the image to service side
    // Default: cannot upload
    uploadUrl: String,
    
    // Pictures cannot be update
    // Default: can update
    cannotUpdate: null,

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
      value: '../../../assets/images/upload-image.png'
    },
  },
  data: {
    uploadImagePath: "",
    progress: 0
  },

  methods: {
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

        this.trigger('upload', {
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

      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: count,
          sizeType: sizeType,
          sourceType: sourceType,
          success(res) {
            
            // Limit Picture Size
            const limitImg = (function () {
              let { path, size } = res.tempFiles[0];
              return /png|jpg|jpeg/g.test(path) && size < (1024 * 1024 * 2);
            } ())

            // 不符合图片规则
            if (!limitImg) {
              alert._showToast({ title: '请上传png, jpg, jpeg格式图片!', duration: 5000 });
              return;
            };
            resolve(res.tempFilePaths[0]);
          }
        })
      })
    },
    
  }
})
