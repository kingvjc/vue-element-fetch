/**
 * @file 对接开发环境mock server配置
 * @author chuntyang
 * Apr 10, 2018
 */
const fs = require('fs');
const pathFile = require('path');
module.exports = function mockServer(req, res, next) {
    let path = req.path;
    path = path.charAt(0) === '/' ? '../mock' + path : '../mock/' + path;
    const reg = new RegExp('api');
    const regMock = new RegExp('mock');
    if (reg.test(path)) {
        // 法一 解决改变文件不能随时改变数据问题
        try {
            const file = pathFile.join(__dirname, `${path}.json`);
            res.send(fs.readFileSync(file, 'utf-8'));
            return;
        } catch (e) {
            console.log(e);
        }
    }
    return next();
};