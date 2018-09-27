/**
 * @file 公共的配置
 *
 * @author chuntyang
 * Aug 10, 2018
 */
export const contentType = 'Content-Type'

export function formUrl(url, domain=location.host, urlConfig = urlConfig) {
	// if (domain === 'localhost:8080') {
	//     url='http://localhost:3000' + url;
	//  }
	 return url;
}
// 获取cookie的值
function getCookie(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const result = document.cookie.match(reg);
    return result ? result[2] : null;
}

// 对象深度拷贝
function extend(to, from, deep=true) {
     let target = to || {};
     for(let [key, value] of Object.entries(from)) {
        if (typeof value === 'object' && deep) {
            target[key] = Array.isArray(value) ? [] : {};
            extend(target[key], value, deep);
        } else {
            target[key] = value;
        }
     }
     return target;
 }
 /**
 * url参数拼接
 * @param  {Object}  target   目标对象
 * @param  {Array}   array    要拼接的健的集合,没有时默认拼接target中的所有参数
 * @param  {String}  url      原url
 * @return {String}           新url
 */

export function urlConcat(url, target = {}, array) {
    const reg = /\?/;
    const reduceArray = array || Object.keys(target);
    return reduceArray.reduce((total, key, index) => {
        const isEmpty = target[key] || target[key] === 0 ? true : false;
        if (!reg.test(total)) {
            return isEmpty ? total + '?' + key + '=' + target[key] : total;
        }
        return isEmpty ? total + '&' + key + '=' + target[key] : total;
    }, url);
}

/**
 * 数组对象转化单一数组
 * @param  {Array}  array  目标数组
 * @param  {string} key    键
 * @return {Array}  total  新数组
 */
export function arrayToSingleArr(array, key) {
    return array.reduce((total, current) => {
        total.push(current[key]);
        return total;
    }, []);
}

/**
* 1、递归遍历树形结构，返回特定条件的值
* @praram array [Array] 递归的对象
* @param key  [string] 判定条件的健
* @param value [string] 判定条件的值
* @param result [string] 返回的指定条件
* return [string] 指定条件的值
*/
function textToId(array, key, value, result) {
    for (let i = 0; i < array.length; i++) {
        if(array[i][key] === value) {
            return array[i][result];
        }
        if(array[i].children) {
            if (textToId(array[i].children, key, value, result)) {
                return textToId(array[i].children, key, value, result);
            }
        }
    }
}
/**
 * 获取日期格式输出
 * @param  {Date}   time   时间
 * @param  {String} format 输出格式，要求必须含有yyyy,mm,dd
 * @return {String}        默认返回yyyymmdd格式时间
 */
 export function getTimeStr(time, format = 'yyyy-MM-dd HH:mm:ss') {
    if (typeof time === 'string' ||
        typeof time === 'number') {
        time = new Date(time);
        return format
            .replace('yyyy', time.getFullYear())
            .replace('MM', leftpad(time.getMonth() + 1, 2, '0'))
            .replace('dd', leftpad(time.getDate(), 2, '0'))
            .replace('HH', leftpad(time.getHours(), 2, '0'))
            .replace('mm', leftpad(time.getMinutes(), 2, '0'))
            .replace('ss', leftpad(time.getSeconds(), 2, '0'));
    }
    return '';
}

function leftpad(str, len, ch = ' ') {
    str = str + '';
    len = len - str.length;
    if (len <= 0) {
        return str;
    }
    ch = ch + '';
    let pad = '';
    while (len) {
        if (len & 1) {
            pad += ch;
        }
        len >>= 1;
        ch += ch;
    }
    return pad + str;
}
/**
 * [formParams 去除空的字段]
 * @param  {[type]} params [目标对象]
 * @return {[type]}        [null]
 */
export function formParams(params) {
    for(let k in params) {
        if(!params[k]) {
            delete params[k];
        }
    }
}

export const formatHeader = {
    default: 'application/x-www-form-urlencoded',
    json: 'application/json' 
}
