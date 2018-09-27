/**
 * @file 请求封装
 *
 * @author chuntyang
 * Aug 10, 2018
 */

import 'isomorphic-fetch';
import errMessage from './errorMessage';
import {formUrl,formParams, formatHeader, contentType} from './util';
let header = {
	    'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-requested-with': 'fetch'

}

function goToLogin() {
    location.href = '/login.html';
}

export default  function request(params) {
  //切换content-type类型
  const {requestType} = params;
  header[contentType] = requestType ? formatHeader[requestType] :  formatHeader['default'];

	let reqheader = {
		  method: params.method,
		  headers: header,
		  credentials: 'include'// 支持携带cookie
	}

	// 处理get请求中的参数
  let url =  formUrl(params.url);
  url+=`?t=${+new Date()}`;
  
  formParams(params.params);
	if (params.method === 'get') {
  		for (let i in params.params) {
  			url += `&${i}=${params.params[i]}`;
  		}
	}
	if (params.method !== 'get') {
		  reqheader.body = `data=${JSON.stringify(params.params)}`;
	}
  return new Promise((resolve, reject) => {
      fetch(url, reqheader).then(response => {
          if (response.status !== 200) {
              errMessage.$emit('requestError', '请求异常');
              reject(response);
          }
          return response.json();
      }).then(data => {
          switch (Number(data.status)) {
             case 127:
                  goToLogin();
                  break;
              case -1:
                  errMessage.$emit('requestError', data.message);
                  break;
              case 0:
                  break;
              default:
                  errMessage.$emit('requestError', '后台程序崩溃了');
          }
          resolve(data);
      }).catch(error => {
          reject(error);
      });
  });
}
