
/**
 * 获取页面中 Toast 和 Message 的组件
 * @param { String } selector 
 */
function getComponent (selector) {
  const pages = getCurrentPages();
  const selec = pages[pages.length - 1];

  const component = selec.selectComponent(selector)

  if (!component) {
    throw new Error ('未获取到默认Message组件, id = message');
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
function Toast (options) {
  const { selector = "#toast" } = options;

  const component = getComponent(selector);
  component.show();
}

/**
 * Message 顶部文字提示框
 * @param { Object } options 用户自定义配置属性
 * @desc 默认组件 ID #message
 */
function Message (options) {
  const { selector = '#message' } = options;

  const _component = getComponent(selector);
  _component.show(options)
}

module.exports = {
  $Message: Message,
  $Toast: Toast
}
