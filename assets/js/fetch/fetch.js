// 请求地址
const BASE_URL = 'https://xmp.ctbls.com/smx/'
// const BASE_URL = 'https://mp.ctbls.com/smx/'

// class Fetch {
//   constructor () {
//     this.BASE_URL = 'https://xmp.ctbls.com/smx/';
//     // this.BASE_URL = 'https://mp.ctbls.com/smx/';
//   }
// }

// export default new Fetch()

export const $get = (url, data = {}) => {
  return fetch(url, data, "GET");
}
export const $post = (url, data = {}, header = {}) => {
  return fetch(url, data, "POST", header);
}

function fetch (url, data, method, header = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      data: data,
      method: method,
      header: header,
      success: res => {
        const { data, statusCode } = res;
        resolve(data);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}