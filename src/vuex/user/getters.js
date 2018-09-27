export function userIsLogin(state) {
	return state.userInfo.userId !== '';
}
export function userInfo(state) {
	return state.userInfo;
}