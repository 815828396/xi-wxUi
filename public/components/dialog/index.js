// public/dialog/dialog.js
import behaviors from '../../../utils/behaviors/behaviors';
Component({

  externalClasses: [ 'xi-class' ],

  behaviors: [ behaviors ],

  properties: {
    visiable: Boolean,
    closeDialogModal: Boolean,
    center: Boolean,
    title: String,
    imgsrc: {
      type: String,
      value: ''
    },
    
    // 按钮组
    confirm: {
      type: String,
      value: '确定'
    },
    cancel: {
      type: String,
      value: '取消'
    },
    showCancel: {
      type: String,
      value: ''
    }
  },

  methods: {
    btnClick (e) {
      const { target } = e.currentTarget.dataset;

      this.triggerEvent('click', {
        confirm: target === 'confirm',
        cancel: target === 'cancel'
      });
    },
    closeDialog (e) {
      // 点击到非 model 层防止事件穿透
      if (e.target.dataset.target !== 'filter') return;
      // 禁止 通过点击 model 层关闭模态框
      if (this.data.closeDialogModal) return;

      this.setData({ visiable: false });
    },
  }
})
