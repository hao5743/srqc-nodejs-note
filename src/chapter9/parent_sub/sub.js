/**
 * 2017-01-04 21:06:41
 * 子进程文件
 */
process.on('message', (m) => {
  console.log('Child got message:', m);
});
process.send({
  foo: 'this is a message from sub'
});
