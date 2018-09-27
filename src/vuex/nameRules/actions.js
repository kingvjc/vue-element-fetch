import * as Api from './api';
// 1.获取字段列表
export async function getCodeList({state, commit}) {
	const State = state.codeOption;
	const data = await Api.codeListUrl({
		...State.conditions,
		pageSize: State.pageQuery.pageSize,
		pageNum: State.pageQuery.pageNum
	});
	commit('SET_CODE_LIST', data);
	return data;
}
// 2.新增字段
export async function addCode({}, params) {
	return await Api.addCodeUrl(params);
}
// 3.删除字段
export async function deleteCode({}, id) {
	return await Api.deleteCodeUrl(id);
}
// 4.编辑字段
export async function editCode({}, params) {
	return await Api.editCodeUrl(params);
}