// 请求地址
import Base_config from './default'
class Fetch extends Base_config {
  constructor() {
    super();
    // Is interceptores
    this.isInterceptors = false;
    // The Request interceptors by user-defined Config
    this.user_config = {};

    // The interceptors entry config object
    // 用户配置函数必须将配置信息返回
    this.interceptors = {
      request: this.request.bind(this),
      reponse: this.response.bind(this)
    };
  }

  /**
   * Request interceptors 请求拦截器
   * @desc 用户自定义修改的配置函数
   * @param { Function } config 请求体配置函数
   * @param { Function } error 错误状态函数
   */
  request(config, error) {
    if (!this.isFn(config) || !this.isFn(error)) {
      throw new Error('请传入函数');
    }
    
    // Start interceptors
    if (config || error) this.isInterceptors = true;

    // User-defined Function mount global this
    // 将用户设置的函数保存
    this.requestFn = config && config;
    this.requestErrorFn = error && error;
  }

  // FIXME: 响应拦截器
  response() { }

  $get(url, data = {}) {
    this.url = url;
    this.data = data;
    this.method = 'GET';
    this.user_config = this.requestFn(this.requestConfig());
    return this._fetch()
  }

  $post(url, data = {}) {
    this.url = url;
    this.data = data;
    this.user_config = this.requestFn(this.requestConfig());

    // Reset Headers['Content-Type']
    this.method = 'POST';
    this.headers['Content-type'] = this.content_type;
    return this._fetch();
  }

  /**
   * TO Return Request interceptors config
   * @description 返回配置信息,如果用户未定义拦截器返回 默认配置信息
   */
  requestConfig() {
    if (this.isGet(this.method)) delete this.headers.content_type;
    return this.deepCopy({
      headers: this.headers,
      method: this.method,
      base_url: this.base_url,
      data: this.data,
      url: this.url || ""
    })
  }

  /**
   * Private Function
   * 不提供外部调用, 外部调用需要调用, $get 和 $post 方法
   */
  _fetch() {
    if (this.isInterceptors && this.isNull(this.user_config)) 
      throw new Error('fetch.interceptors.request 拦截器中可能未返回配置信息');
    
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
