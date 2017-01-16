/**
 * 2016-12-24 22:45:11
 * UDP服务端
 */
var dgram = require('dgram');
//创建一个UDP套接字
var server = dgram.createSocket('udp4');
//添加message监听
server.on('message', function(msg, rinfo) {
    console.log('server got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
});
//添加listening监听
server.on('listening', function() {
    var address = server.address();
    console.log('server listening ' + address.address + ':' + address.port);
});
//调用bind(port,[address])方法对网卡和端口进行绑定，让UDP套接字接受网络消息
//该套接字将接受所有网卡上41234端口上的消息。
//绑定完成后，将触发listening事件
server.bind(41234);
