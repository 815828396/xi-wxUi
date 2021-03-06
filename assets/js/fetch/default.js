
export default class Base_config {
  constructor() {
    this.base_url = 'https://xmp.ctbls.com/smx/';
    // this.base_url = 'https://mp.ctbls.com/smx/';
    this.data = "";
    this.method = 'POST';
    this.content_type = 'application/json';

    this.headers = {
      'Content-type': this.content_type
    };

    this.requestFn = function () { };
    this.requestErrorFn = function () { };

    this.responseFn = function () { };
    this.responseErrorFn = function () { };
  }

  set method(method) {
    if (this.isGet(method)) delete this.headers['Content-type'];
    this._method = method;
  }
  get method() {
    return this._method;
  }

  isFn(_) {
    return typeof _ === 'function';
  }

  isNull  (_) {
    return typeof _ === 'undefined' || _ === null;
  }

  isGet(_) {
    return _ === 'GET';
  }
  /**
   * 简单的深拷贝
   * @param {*} _ 拷贝对象
   */
  deepCopy(_) {
    return JSON.parse(JSON.stringify(_));
  }
}