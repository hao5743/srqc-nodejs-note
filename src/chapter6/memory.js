/**
 * 2016-12-21 23:37:30
 * 在这里我们不断分配内存空间，并打印内存使用情况，
 * var arr = new Array(size);
 * 可以看到内存使用量逐步提高，当超过1.4g时会进程内存溢出
 * var buffer = new Buffer(size);
 * 不会溢出,因为Buffer对象不同于其他对象,他不经过v8的分配机制,不会有堆内存的大小限制
 *
 */
var showMem = function() {
    var mem = process.memoryUsage();
    var format = function(bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + 'MB';
    };
    console.log('Process:heapTotal ' + format(mem.heapTotal) +
        ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    console.log('---------------');
};
var useMem = function() {
    // var size = 20 * 1024 * 1024;
    // var arr = new Array(size);
    var size = 200 * 1024 * 1024;
    var buffer = new Buffer(size);
    for (var i = 0; i < size; i++) {
        buffer[i] = 0;
    }
    return buffer;
};
var total = [];
for (var j = 0; j < 15; j++) {
    showMem();
    total.push(useMem());
}
showMem();
