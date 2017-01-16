/**
 * 2016-12-22 22:41:48
 * 这里启动一个http服务器来监听本机的1337端口地址
 */
var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello,World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337');
