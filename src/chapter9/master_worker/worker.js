/**
 * 2017-01-05 22:59:10
 * 启动一个http服务器，并监听一个随机端口号
 * 作为master的从进程运行
 */
var http = require('http');
//获取一个随机端口
var port = Math.round((1 + Math.random()) * 1000);
http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello,World\n');
}).listen(port, '127.0.0.1');
console.log('listend on port:'+port);
