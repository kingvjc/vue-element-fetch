/**
 * @file 公共配置
 * @author chuntyang
 * July 15, 2018
 */
export function resetObject(object) {
	for (let k in object) {
		object[k] = '';
	}
}
export function setObject(target, object) {
	for(let k in target) {
		target[k] = object[k];
	}
}

/**
 * 获取day天的标准时间
 * @param {number} day 天数;
 * @return {Object}date    标准时间
 */
export function getDayTime(day = 30) {
    const date = new Date();
    date.setTime(date.getTime() - 3600 * 1000 * 24 * day);
    return date;
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




