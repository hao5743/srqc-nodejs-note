/**
 * 2016-12-24 22:44:45
 * UDP客户端
 */
var dgram = require('dgram');
var message = new Buffer('hello UDP');
//创建一个UDP套接字
var client = dgram.createSocket('udp4');
//调用send方法发送消息到网络中
//send(buf, offset, length, port, address, [callback])
//要发送的buffer、buffer起始偏移、buffer长度、目标端口、目标地址、发送完成后回调
client.send(message, 0, message.length, 41234, 'localhost', function(err, bytes) {
    client.close();
});
