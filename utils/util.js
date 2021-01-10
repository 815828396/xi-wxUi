const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取某年的当月有多少天
const getMonthDays = (year, month) => {
  return new Date(year, month, 0).getDate();
}
// 获取某年某月的一号是周几
const getMonthFirstDay = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
}


/** url 参数转换 */
const qs = {
  stringify: (path, query) => {
    let url = ''
    path = path.lastIndexOf('?') > 0 ? path.substr(0, path.length - 1) : path
    for (let key in query) {
      url += `&${key}=${query[key]}`
    }
    return path + url.replace('&', '?')
  },
  parse: (query) => {
    let obj = {}
    query.match(/([^?=&]+)(=([^&]*))/g).map(item => {
      obj[item.substr(0, item.indexOf('='))] = item.substr(item.indexOf('=') + 1, item.length)
    })
    return obj
  }
}

module.exports = {
  formatTime: formatTime,
  qs: qs,
  getMonthDays: getMonthDays,
  getMonthFirstDay: getMonthFirstDay
}
