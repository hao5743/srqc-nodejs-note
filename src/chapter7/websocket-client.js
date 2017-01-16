/**
 * 2016-12-24 23:47:01
 * WebSocket客户端
 * 代码中，浏览器和服务器创建websocket协议请求，在请求完成后连接打开，
 * 每50ms向服务器端发送一次数据，同时可以通过onmessage()方法接收服务器端传来的数据
 */
var socket = new WebSocket('ws://127.0.0.1:12010/updates');
socket.onopen = function() {
    setInterval(function() {
        if (socket.bufferedAmount === 0) {
            socket.send(getUpdateData());
        }
    }, 50);
};
socket.onmessage = function(event) {
    //todo : enent.data
};
