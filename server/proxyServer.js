/**
 * @file 对接开发环境 server配置
 * @author chuntyang
 * Apr 10, 2018
 */
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const mockServer = require('./mockServer');

const devEnv = {
    online: '',       //正式环境
    practice: '',     //练习环境
    test: 'http://localhost:3000'          //测试环境
}

module.exports = function proxyServer(req, res, next) {
    // TODO关于mock编写
    if (req.headers['x-requested-with'] === 'fetch') {
        if (process.env.MOCK === 'true') {
            console.log('mock -> ' + req.url);
            return mockServer(req, res, next);
        }
        console.log('proxy -> ' + req.url);
        return proxy.web(req, res, {
             target: devEnv.test,
             changeOrigin: true  //本地虚拟服务器处理跨域
        }, err => {
             console.log(err);
        });
    }
    return next();
};