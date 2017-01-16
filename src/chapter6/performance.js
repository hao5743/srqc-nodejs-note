/**
 * 2016-12-20 22:37:52
 * 使用nodejs计算斐波那契数列，并记录时间，用于考量nodejs的运行效率
 */
console.log(module.paths);
var t = [];
t[0] = 0;
t[1] = 1;
t[2] = 1;

//存储中间结果，优化算法
function fibonaci2(n) {
    if (typeof t[n] === 'number') {
        return t[n];
    } else {
        t[n] = fibonaci2(n - 1) + fibonaci2(n - 2);
        return t[n];
    }
}
//未优化算法
function fibonaci(n) {
    if (n === 2) return 1;
    if (n === 1) return 1;
    if (n === 0) return 0;
    return fibonaci(n - 1) + fibonaci(n - 2)
}
var n = 43;
var starttime = new Date();
var ans = fibonaci(n);
var endtime = new Date();
var time = endtime - starttime;
console.log('结果是：' + ans);
console.log('运行耗时：' + time + 'ms');
starttime = new Date();
var ans2 = fibonaci2(n);
endtime = new Date();
time = endtime - starttime;
console.log('结果是：' + ans2);
console.log('运行耗时：' + time + 'ms');
