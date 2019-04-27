// pages/swiper/index.js
Page({

  data: {
    hide:  false,
    swiperUrl: [
      "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=384565864,2433764991&fm=85&app=63&f=JPG?w=121&h=75&s=1800E5161876A88879B0FDC3030030A1",
      "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=384565864,2433764991&fm=85&app=63&f=JPG?w=121&h=75&s=1800E5161876A88879B0FDC3030030A1",
      "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=384565864,2433764991&fm=85&app=63&f=JPG?w=121&h=75&s=1800E5161876A88879B0FDC3030030A1",
      "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=384565864,2433764991&fm=85&app=63&f=JPG?w=121&h=75&s=1800E5161876A88879B0FDC3030030A1",
      "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=384565864,2433764991&fm=85&app=63&f=JPG?w=121&h=75&s=1800E5161876A88879B0FDC3030030A1"
    ]
  },
  hide () {
    this.setData({ hide: !this.data.hide });
  }
})