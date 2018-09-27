
import {getUserInfoUrl} from './api.js';

export async function getUserInfo({commit}) {
	const data = await getUserInfoUrl();
    commit('SET_USER_INFO', data);
	return data;
}