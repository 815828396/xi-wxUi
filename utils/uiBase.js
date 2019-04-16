
/**
 * 获取页面中 Toast 和 Message 的组件
 * @param { String } selector 
 */
function getComponent(selector, tip = '') {
  const pages = getCurrentPages();
  const selec = pages[pages.length - 1];

  const component = selec.selectComponent(selector)

  if (!component) {
    throw new Error(`未获取到默认 Message 组件, id = ${tip}`);
  }

  return component
}

/**
 * TODO  : 写样式
 * FIXIME: 需要开发
 * Toast 若提示弹出框
 * @param { Object } options 用户自定义配置属性
 * @desc 默认组件 ID #toast
 */
function Toast(options) {
  const { selector = "#toast" } = options;

  const component = getComponent(selector);
  component.show();
}

/**
 * Message 顶部文字提示框 自动关闭
 * @param { Object } options 用户自定义配置属性
 * @desc 默认组件 ID #message
 * @param_key selector : 元素ID
 * @param_key content  : 文本内容
 * @param_key type     : 弹框类型
 */
function Message(options) {
  const { selector = '#message' } = options;

  const _component = getComponent(selector, '#message');
  _component.show(options);
}

/**
 * Message Close 手动关闭顶部弹框
 * @constructor 构造函数
 * @description 按钮监听事件 onMessageCloseClick , 
 *              需要调用$MessageClose.hide() 方法隐藏
 */
function MessageClose() { };
/**
 * 展示弹框组件
 * @param { Object } options 用户自定义配置属性
 * @param_key selector : 元素ID
 * @param_key content  : 文本内容
 * @param_key type     : 弹框图标类型
 * @param_key btnText  : 按钮文字
 * @param_key 默认组件 ID #message-close
 */
MessageClose.prototype.show = function (options) {
  const { selector = '#message-close' } = options;
  this._component = getComponent(selector, '#message-close');
  this._component.show(options);
}
/**
 * 隐藏弹框
 */
MessageClose.prototype.hide = function () {
  this._component.hide();
}

module.exports = {
  $Message: Message,
  $MessageClose: MessageClose,
  $Toast: Toast
}
