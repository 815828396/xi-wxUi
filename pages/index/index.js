
import { $MessageClose} from '../../utils/uiBase';
const app = getApp();
const MessageClose = new $MessageClose();

Page({
  data: {
    navlist: [
      {
        url: 'dialog',
        title: 'dialog组件'
      }, {
        url: 'modal',
        title: 'modal组件'
      }, {
        url: 'action-sheet',
        title: 'action-sheet组件'
      }, {
        url: 'cell',
        title: 'cell组件'
      }, {
        url: 'message',
        title: 'mesage组件'
      }
    ]
  },
  onLoad: function () {
  },
  asd() {
    MessageClose.show({
      content: 'tishi',
      btnText: '确定吗?'
    });
  },
  aaa() {
    MessageClose.hide();
  }
})
