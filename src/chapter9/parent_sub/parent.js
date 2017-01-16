/**
 * 2017-01-04 21:02:49
 * 演示使用fork创建一个子进程，并和子进程进行通讯
 * 使用 node parent.js 运行
 *
 * child_process提供了4个方法用于创建子进程
 * spawn() : 启动子进程来执行命令
 * exec() ： 与spawn类似，但他有回调函数用来获知子进程的情况
 * execFile() ： 启动一个进程来执行可执行文件
 * fork() : 与spawn类似，不同点它只需要指定js文件
 *
 * 进程通讯
 * 通过fork或其他api创建子进程后，父子进程间会创建IPC通道。通过IPC(进程间通信)通道，父子进程之间才能通过message和send传递消息。
 * node中实现IPC通道的是管道（pipe）技术，具体实现细节通过libuv提供，在windows下由命名管道（named pipe）实现，
 * *nix则采用（Unix Domain Socket）实现。表现在应用层上只有简单的message和send事件。
 */

var cp = require('child_process');
var n = cp.fork(__dirname + '/sub.js');
n.on('message', (m) => {
  console.log('Parent got message:', m);
});
n.send({
  hello: 'this is a message from parent'
});
