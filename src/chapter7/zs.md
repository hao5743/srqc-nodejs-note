# TCP服务

# UDP服务

### curl测试服务器

```
$ curl "http://127.0.0.1:1337/"
```

### UDP服务端

### UDP客户端

### UDP套接字事件

* message: UDP套接字事侦听网卡端口后，接收到消息后触发该事件
* listening: 当UDP套接字开始侦听时触发该事件
* close: 调用close()方法时触发，并不再触message事件
* error: 当异常发生时触发该事件，如果不侦听，异常将直接抛出，使进程退出

# webSocket
webSocket很适合在node中使用，理由：
1. WebSocket也是基于事件的编程模型
2. websocket实现了客户端和服务器之间的长连接，而node事件驱动的方式十分擅长与大量的客户端保持高并发连接。

它的优点有：
1. 客户端和服务器端只建立一个TCP连接，可以使用更少的连接
2. webSocket服务器端可以推送数据到客户端，这比HTTP请求响应模式更灵活，更高效。
3. 有更轻量级的协议头，减少数据传输量。

webSocket协议主要分为两个部分:握手和数据传输
### webSocket握手

客户端建立连接时，通过HTTP发起请求报文：
```bash
GET /chat HTTP/1.1
Host: server.example.com
# 下面两个字段表示请求服务器端升级协议为websocket
Upgrade: websocket
Connection: Upgrade
# 用于安全校验
Sec-WebSocket-Key: dgh1ihnhbxbsSSBUb25jzq==
# 指定子协议
Sec-WebSocket-Protocol: chat, superchat
# 指定子版本号
Sec-WebSocket-Version: 13
```

`Sec-WebSocket-Key`用于安全校验,`Sec-WebSocket-Key`的值是随机生成的Base64编码字符串。
服务器收到之后将其与字符串内容相连，形成字符串`dgh1ihnhbxbsSSBUb25jzq==内容`,然后通过`sha1安全散列算法`计算结果，
再进行Base64编码，最后返回给客户端。

```js
var crypto = require('crypto);
var val = crypto.createHash('sha1').upgrade(key).digest('base64');
```

服务器端在处理完请求后，响应如下报文：

```bash
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPlMBItxaq99kygzzhzrbk+xoo=
Sec-WebSocket-Protocol: chat
```
这个报文告知客户端正在更换协议，更新应用层协议为Websocket协议，并在当前的套接字上应用新协议。

### WebSocket数据传输

* 握手完成后,客户端的onopen()将会被触发执行。
* 当客户端调用send()发送数据时，服务器端触发onmessage();当服务器端调用send（）发送数据时，
客户端的onmessage()触发。当我们调用send()发送一条数据时，协议可能将这个数据封装为一帧或者多帧数据，
然后逐帧发送。
* 客户端需要对发送的数据进行掩码处理，服务器无须做处理。

# 网络服务和安全
> SSL (Secure Sockets Layer，安全套接层) SSL作为一种安全协议，它在传输层提供对网络连接加密的功能。
> TLS (Trasnport Layer Security) 安全传输层协议
 node在网络上提供了三个模块，用于安全。
 * crypto 主要用于加密解密，SHA1、MD5等加密算法都在其中体现
 * tls 提供与net模块类似的功能，区别在于它建立在TLS/SSL加密的TCP连接上
 * https 它完全与http模块接口一致，区别在于它建立在安全连接之上
> CA (Certificate Authority 数字证书认证中心)
> CSR (Certificate Signing Request 证书签名请求)

HTTPS服务就是工作在TLS/SSL上的HTTP