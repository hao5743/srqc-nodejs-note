## 多进程架构

master.js

```js
var fork = require('child_process').fork;
var cpus = require('os').cpus();
for(var i=0;i<cpus.length;i++){
  fork('./worker.js');
}
```

woker.js

```js
var http = require('http');
var port = Math.round((1 + Math.random()) * 1000);
http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello,World\n');
}).listen(port, '127.0.0.1');
console.log('listend on port:'+port);

```

 这段代码会根据当前机器上的cpu数量复制出对应node进程数,在linux中
 ```bash
 # 查看进程数目
 $ ps aux | grep worker.js 
 ```
 这就是著名的Master-Woker模式，又叫主从模式
 
 主进程不负责具体业务处理，而是负责调度或管理工作进程，它是趋向于稳定的。
 
 通过fork复制的进程都是一个独立的进程，这个进程中有全新而独立的v8实例。他需要至少30ms的启动时间和10MB的内存，代价是昂贵的。这只是为了能够将cpu资源充分利用起来，不是为了解决并发问题。node通过事件驱动的方式在单线程上解决了大并发的问题。

## 创建子进程

child_process提供了4个方法用于创建子进程
* spawn() : 启动子进程来执行命令 
* exec() ： 与spawn类似，但他有回调函数用来获知子进程的情况
* execFile() ： 启动一个进程来执行可执行文件
* fork() : 与spawn类似，不同点它只需要指定js文件
 
## 子进程通讯

通过fork或其他api创建子进程后，父子进程间会创建IPC通道。通过IPC(进程间通信)通道，父子进程之间才能通过message和send传递消息。

node中实现IPC通道的是管道（pipe）技术，具体实现细节通过libuv提供，在windows下由命名管道（named pipe）实现，*nix则采用（Unix Domain Socket）实现。表现在应用层上只有简单的message和send事件。

 