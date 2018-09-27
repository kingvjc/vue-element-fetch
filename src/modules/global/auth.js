/**
 * @file 权限校验
 *
 * @author chuntyang
 */
import store from 'vuex/store';

export async function getUserAuth() {
	if (!store.getters.userIsLogin) {
		try {
			await store.dispatch('getUserInfo');
		} catch (e) {
			throw e;
		}
	}
	if (!store.getters.userIsLogin) {
        return false;
    }
	return true;
}