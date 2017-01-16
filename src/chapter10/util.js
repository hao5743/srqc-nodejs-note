/**
 * 2017-01-09 20:32:41
 * 一个自定义的工具类，我们将为这个工具类编写单元测试
 * 使用 mocha test/util_test.js 来执行测试代码
 */
function isString(str) {
  return typeof str === 'string';
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function isEmail(value) {
  if (typeof value !== 'string') return false;
  var pattern = /^([a-z0-9_\-\.]+)@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return pattern.test(value);
}

function isPhone(value) {
  value = typeof value === 'number' ? value + '' : value;
  if (typeof value !== 'string') return false;
  var pattern = /^(86|\+86)?\d{3}[-\s]?\d{4}[-\s]?\d{4}$/;
  return pattern.test(value);
}

var Util = {};
Util.isString = isString;
Util.isUndefined = isUndefined;
Util.isEmail = isEmail;
Util.isPhone = isPhone;

module.exports = Util;
