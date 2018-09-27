import {getTimeStr} from 'common/util';
import {getNewArray} from './config';
export function SET_CODE_LIST(state, data) {
	state.codeOption.codeList = getNewArray(data.list, ['updateTime','createTime'], getTimeStr);
	state.codeOption.pageQuery.total = data.total;
}

export function INIT_CODE_PAGE(state, page) {
	state.codeOption.pageQuery = {
		...state.codeOption.pageQuery,
		...page
	}
}

export function CHANGE_CODE_VALUE(state, conditions) {
	state.codeOption.conditions = {
		...state.codeOption.conditions,
		...conditions
	}
}