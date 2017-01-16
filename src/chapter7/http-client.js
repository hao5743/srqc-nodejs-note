/**
 * 2016-12-22 22:40:51
 * 这里启动一个简单的http客户端
 */
var http = require('http');
var options = {
    hostname: '127.0.0.1',
    port: 1337,
    path: '/',
    method: 'GET'
};
var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data', function(chunk) {
        console.log(chunk);
    });
});
req.end();
