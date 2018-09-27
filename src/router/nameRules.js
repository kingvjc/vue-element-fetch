const root = {
	path: '/',
	redirect: 'list'
};
const list = {
	path: 'list',
	name: 'codeList',
	meta: {
		requiresAuth: true,
		label: '规则列表'
	},
	component(resolve) {
		require.ensure([], () => resolve(require('../modules/nameRules/center/list')));
	},
};
const center = {
	path: 'center',
	name: 'center',
	meta: {
		requiresAuth: true,
		label: '规则中心'
	},
	component(resolve) {
		require.ensure([], () => resolve(require('../modules/nameRules/center')));
	},
	children: [root, list]
};
export default {
	path: '/name-rules',
	name: 'nameRules',
	redirect: '/name-rules/center',
	icon: 'el-icon-service',
	meta: {

		requiresAuth: true,
		label: '命名管理'
	},
	component(resolve) {
		require.ensure([], () => resolve(require('../modules/nameRules')));
	},
	children: [center]
}
