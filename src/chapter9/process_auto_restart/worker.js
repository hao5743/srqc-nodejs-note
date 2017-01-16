/**
 * 2017-01-07 21:33:20
 * 子进程，该进程在出现错误，抛出异常后，主进程会自动重启一个新的进程来服务
 */
var http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  console.log('pid: '+process.pid+' get a req');
  res.end('Hello,World.Handled by child, pid is ' + process.pid + '\n');
  //接收到一个请求，作出响应后抛出一个异常，此进程将发送一个自杀信号并退出，主进程启动一个新进程来服务
  throw new Error('throw exception');
});

var worker;
process.on('message', (m, tcp) => {
  if (m === 'server') {
    worker = tcp;
    worker.on('connection', function (socket) {
      server.emit('connection', socket);
    });
  }
});
//监听异常事件
process.on('uncaughtException', function (err) {
  //记录日志
  logger.error(err);
  //向主进程发送一个自杀信号
  process.send({act:'suicide'});
  console.log('got a uncaughtException exception');
  //停止接受新的连接
  worker.close(() => {
    //在所有连接断开后，退出进程
    process.exit(1);
  });
  //设置超时，5s后自动退出进程，防止连接长时间无法断开时，进程一直无法退出
  setTimeout(function() {
    process.exit(1);
  }, 5000);
});
console.log('server started on pid: '+process.pid);
