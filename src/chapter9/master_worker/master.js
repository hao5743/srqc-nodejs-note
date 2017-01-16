/**
 * 2017-01-05 22:57:10
 * 1.这段代码会根据当前机器上的cpu数量复制出对应node进程数。
 * 在linux中，使用$ ps aux | grep worker.js 查看进程数目
 * 2.这就是著名的Master-Woker模式，又叫主从模式
 * 3.主进程不负责具体业务处理，而是负责调度或管理工作进程，它是趋向于稳定的。
 * 4.通过fork复制的进程都是一个独立的进程，这个进程中有全新而独立的v8实例。
 * 使用 node master.js 执行程序
 */
var fork = require('child_process').fork;
//获取当前机器cpu核心数
var cpus = require('os').cpus();
for(var i=0;i<cpus.length;i++){
  fork('./worker.js');
}
