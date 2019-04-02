// 请求地址
const BASE_URL = 'https://xmp.ctbls.com/smx/'
// const BASE_URL = 'https://mp.ctbls.com/smx/'

import Base_config from './default'
class Fetch extends Base_config {
  constructor () {
    super();
    // 是否设置拦截器
    this.isInterceptors = false;
    // 启用拦截器后,配置属性
    this.user_config = {};

    // 拦截器配置函数
    this.interceptors = {
      request: this.request.bind(this),
      reponse: this.response.bind(this)
    };
  }

  // 请求拦截器
  request (config, error) {
    if ( this.isFn(config) && this.isFn(error) ) {
      throw new Error ('请传入函数');
    }
    // 启用请求拦截器
    if (config || error) this.isInterceptors = true;

    // 将拦截器函数 挂载 this
    this.requestFn = config && config;
    this.requestErrorFn = error && error;
  }
  response () {

  }
  
  $get (url, data = {}) {
    this.url = url;
    this.data = data;
    this.method = 'GET';
    this.user_config = this.requestFn(this.requestConfig());
    return this._fetch();
  }

  $post (url, data = {}) {
    this.url = url;
    this.data = data;
    this.user_config = this.requestFn(this.requestConfig());
    this.method = 'POST';
    this.headers['Content-type'] = this.content_type;
    // console.log(this.headers);
    return this._fetch();
  }

  // request 拦截器返回配置对象
  requestConfig () {
    if (this.isGet(this.method)) delete this.headers.content_type; 
    return this.deepCopy({
      headers: this.headers,
      method: this.method,
      base_url: this.base_url,
      data: this.data,
      url: this.url || ""
    })
  }
  
  _fetch () {
    // 获取配置属性否则为默认属性
    const { 
      base_url = this.base_url, 
      data = this.data, 
      method = this.method, 
      headers = this.headers,
      url = this.url 
    } = this.isInterceptors && this.user_config;

    return new Promise((resolve, reject) => {
      console.log( base_url + url)
      wx.request({
        url: base_url + url,
        data: data,
        method: method,
        header: headers,
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

}


const $fetch = new Fetch();
$fetch.interceptors.request(
  config => {
    config.base_url = 'https://xmp.ctbls.com/smx/'
    config.headers['X-token'] = 123
    return config;
  }
)
$fetch.$post('Login/getProvince1', {
  asd: 1,
  b: 2
}).then(res => {
  // console.log(res)
}).catch(err => {
  console.log(err)
})
// $fetch.$post('Login/getProvince1')
// console.log($fetch.interceptors)

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