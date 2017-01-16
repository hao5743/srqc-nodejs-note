/**
 * 2016-12-23 22:43:52
 * 创建并启动一个tcp服务端，使用net模块
 */
var net = require('net');
var server = net.createServer();
server.on('connection', function(socket) {
    //新的连接
    socket.on('data', function(data) {
        socket.write('收到了:' + data);
    });
    socket.on('end', function() {
        console.log('连接断开');
    });
    socket.write('欢迎来到tcp示例\n\r');
    socket.write('tcp端write一句话');
});
server.listen(8124, function() {
    console.log('server bound');
});
