
import request from 'common/request';
//
export async function getUserInfoUrl(){
	return await request({
		method: 'get',
		url: '/api/users',
		requestType: 'json'
	})
}
