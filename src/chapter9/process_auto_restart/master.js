/**
 * 2017-01-07 21:22:46
 * 启动多个子进程，并在子进程出现异常时在合适的时机自动重启
 */
var fork = require('child_process').fork;
var cpus = require('os').cpus();
var server = require('net').createServer();
server.listen(1337);
var workers = {};
var createWorker = function() {
    var worker = fork(__dirname + '/worker.js');
    //启动新的进程
    worker.on('message', (message) => {
        //接受到自杀信号的时候，就启动一个新进程，防止极端情况下没有进程为用户提供服务
        if (message.act === 'suicide') {
            createWorker();
        }
    });
    //监听子进程退出事件，并删除进程标识
    worker.on('exit', function() {
        console.log('worker ' + worker.pid + ' exited.');
        delete workers[worker.pid];
    });
    //转发句柄
    worker.send('server', server);
    workers[worker.pid] = worker;
    console.log('create worker. pid: ' + worker.pid);
};
//创建cpu核心数个进程
for (var i = 0; i < cpus.length; i++) {
    createWorker();
}
//主进程自己退出时，让所有工作进程退出
process.on('exit', function() {
    for (var pid in workers) {
        workers[pid].kill();
    }
});
