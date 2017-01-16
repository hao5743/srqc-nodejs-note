/**
 * mocha测试框架
 * 1.测试风格：TDD，BDD，这里我们使用BDD风格测试
 * 2.mocha可以搭配多种断言库使用，如should.js,chai,expect，这里我们选用chai断言库，需使用npm install chai 安装
 */
var util = require('../util');
var expect = require('chai').expect;
describe('测试isString', () => {
    it('\'tom\'是字符串', () => {
        expect(util.isString('tom')).equal(true);
    });
    it('1不是字符串', () => {
        expect(util.isString(1)).equal(false);
    });
});
describe('测试isUndefined', () => {
    it('undefined是', () => {
        expect(util.isUndefined(undefined)).to.be.true;
    });
    it('1不是', () => {
        expect(util.isUndefined(1)).to.be.false;
    });
});
describe('测试isEmail', () => {
    var e = 'hao123@163.com';
    it('\'' + e + '\'是邮箱', () => {
        expect(util.isEmail(e)).to.be.true;
    });
    var e2 = 'hao.tom@sina.com.vip.cn';
    it('\'' + e2 + '\'是邮箱', () => {
        expect(util.isEmail(e2)).to.be.true;
    });
    var e3 = 'hao123sina.cn';
    it('\'' + e3 + '\'不是是邮箱', () => {
        expect(util.isEmail(e3)).to.be.false;
    });
    var e4 = '123123-===';
    it('\'' + e4 + '\'不是邮箱', () => {
        expect(util.isEmail(e4)).to.not.be.true;
    });
});
describe('测试isPhone', () => {
    it('13519227871是', () => {
        expect(util.isPhone(13519227871)).to.be.true;
    });
    it('\'13519227871\'是', () => {
        expect(util.isPhone('13519227871')).to.be.true;
    });
    it('110不是', () => {
        expect(util.isPhone(110)).to.be.false;
    });
});
//异步测试, 设置超时
//mocha的默认超时时间为2000ms，超过2000将会出错
//可以通过mocha -t <ms>设置所有用例的超时时间
//如果特殊需要，可在it或describe层级中调用this.timeout(ms)实现对单个用例的特殊设置
describe('异步测试', () => {
    it('settimeout(1000ms) should be ok, cause mocha default timeout time is 2000ms', (done) => {
        //使用settimeout来模拟异步函数调用
        setTimeout(function() {
            var value = 1;
            expect(value).equal(1);
            done();
        }, 1000);
    });
    it('settimeout(2500ms) should be ok, cause we use this.timeout(5000)', function(done) {
        //使用settimeout来模拟异步函数调用
        //如果使用箭头函数会出错，因为箭头函数强制绑定到当前作用域
        this.timeout(3000);
        setTimeout(function() {
            var value = 1;
            expect(value).equal(1);
            done();
        }, 2500);
    });
});
