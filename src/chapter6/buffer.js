/**
 * 2016-12-20 21:36:52
 * 字符串和buffer的互相转换
 */
var str = 'hello node';
//字符串转buffer
var buffer = new Buffer(str, 'utf-8');
console.log(buffer);
//buffer转字符串
var bufstr = buffer.toString('utf-8');
console.log(bufstr);
