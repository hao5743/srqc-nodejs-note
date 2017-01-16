/**
 * 2017-01-07 23:00:51
 * 这里启动两个子进程，并让它们监听同一端口
 * 使用了传递句柄的方式，来实现让多个进程监听同一个端口号
 */
var cp = require('child_process');
var child1 = cp.fork('child.js');
var child2 = cp.fork('child.js');
//打开server，发送句柄
var server = require('net').createServer();
server.listen(1337, function() {
    child1.send('server', server);
    child2.send('server', server);
    //关闭
    server.close();
});
server.on('close', () => {
    console.log('parent closed.');
});
