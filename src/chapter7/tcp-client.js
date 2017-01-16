/**
 * 2016-12-23 22:43:42
 * 这是一个tcp客户端，可以用来和tcp服务端建立连接，和发送请求。
 */
var net = require('net');
var client = net.connect({
    port: 8124,
    function() {
        console.log('client connected');
        client.write('Im tcp client!\r\n');
    }
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', function() {
    console.log('client disconnected!');
});
