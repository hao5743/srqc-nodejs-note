/**
 * 2017-01-07 23:16:41
 * 要启动的子进程，让它接受父进程传来的“server”,监听此句柄
 */
var http = require('http');
var server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('handled by child, pid is ' + process.pid + '\n');
});
process.on('message', (m, tcp) => {
    if (m === 'server') {
        tcp.on('connection', (socket) => {
            server.emit('connection', socket);
        });
    }
});
console.log('server started on pid: ' + process.pid);
