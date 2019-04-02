// 请求地址
import Base_config from './default'
class Fetch extends Base_config {
  constructor () {
    super();
    // Is interceptores
    this.isInterceptors = false;
    // The Request-interceptors user-defined Config
    this.user_config = {};

    // The interceptors entry config object
    // MUST: Request
    //    The interceptors Function must 'return config'
    this.interceptors = {
      request: this.request.bind(this),
      reponse: this.response.bind(this)
    };
  }

  // Request-interceptors
  request (config, error) {
    if ( this.isFn(config) && this.isFn(error) ) {
      throw new Error ('请传入函数');
    }
    // Start interceptors
    if (config || error) this.isInterceptors = true;

    // User-defined Function mount global this
    this.requestFn = config && config;
    this.requestErrorFn = error && error;
  }
  response () {}
  
  $get (url, data = {}) {
    this.url = url;
    this.data = data;
    this.method = 'GET';
    this.user_config = this.requestFn(this.requestConfig());
    return this._fetch()
  }

  $post (url, data = {}) {
    this.url = url;
    this.data = data;
    this.user_config = this.requestFn(this.requestConfig());

    // Reset Headers['Content-Type']
    this.method = 'POST';
    this.headers['Content-type'] = this.content_type;
    return this._fetch();
  }

  // TO Return Request-interceptors config
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
    const { 
      base_url = this.base_url, 
      data = this.data, 
      method = this.method, 
      headers = this.headers,
      url = this.url 
    } = this.isInterceptors && this.user_config;

    return new Promise((resolve, reject) => {
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

export default new Fetch();
