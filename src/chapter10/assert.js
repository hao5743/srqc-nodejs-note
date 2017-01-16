/**
 * 2017-01-09 20:31:38
 * assert断言模块
 * 符合预期时没有任何反应，
 * 不符合预期时会抛出异常
 * 市面上的断言库都是基于assert模块进行扩展的
 */

var assert = require('assert');
assert.equal(Math.max(1,100),100);  //true
assert.deepEqual({a:1},{a:1});  //是否深度相等，true
assert.ok(100==='100');    //抛出异常
