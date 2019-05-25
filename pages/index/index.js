
import { $MessageClose} from '../../utils/uiBase';
import fetch from '../../assets/js/fetch/fetch'
const app = getApp();
const MessageClose = new $MessageClose();

Page({
  data: {
    pagesList: [
      { url: 'shadow', title: 'box-shadow应用' },
      { url: 'papaw', title: '对话内容' },
      { url: 'timeAxis', title: '步骤条' },
      { url: 'province', title: '省份选择器' },
      { url: 'swiper', title: '轮播图' },
      { url: 'draw', title: '抽屉' },
      { url: 'skeleton', title: '骨架屏' },
      { url: 'image', title: '图片组件' },
      { url: 'checkbox', title: 'checkbox' },
    ],
    navlist: [
      {
        url: 'dialog',
        title: 'dialog组件'
      }, {
        url: 'modal',
        title: 'modal组件'
      }, {
        url: 'action-sheet',
        title: 'action-sheet'
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
    // 拦截器调用示例
    fetch.interceptors.request(
      config => {
        // console.log(config)
        // config.data.as = 123;
        if (config.data.token) {
          config.data.id = 3
        }
        return config;
      },
      error => {
        console.log(error)
      }
    )
    fetch.$get('Login/getProvince', {
      a: 1,
      b: 2
    }).then(res => {
      console.log(res);
    })
    fetch.$get('Login/getCity', {
      token: 12
    }).then(res => {
      console.log(res);
    })
  },
  asd() {
    MessageClose.show({
      content: 'tishi',
      btnText: '确定吗?',
      center: true
    });
  },
  aaa() {
    MessageClose.hide();
  }
})
