/**
 * @file 路由配置
 * @author chuntyang
 * Aug 10, 2018
 */

import Vue from 'vue';
import Router from 'vue-router';
import nameRules from './nameRules';
import {getUserAuth} from 'modules/global/auth';

Vue.use(Router)

const home = {
	path: '/',
	name: 'home',
	meta: {
		requiresAuth: true
	},
	component(resolve) {
		require.ensure([], () => resolve(require('../modules/home')));
	}
}
const root = {
    path: '/',
    redirect: '/name-rules',
};
// 404 page
const notFound = {
	path: '/notFound',
	name: 'notFound',
	meta: {
		label: 'notFound',
		requiresAuth: false
	},
	component(resolve) {
		require.ensure([], () => resolve(require('../modules/notFound')));
	}
}

const router = new Router({
	linkActiveClass: 'active',
    routes: [home, notFound, nameRules]
});
//登录前判断路由的跳转以及权限校验
router.beforeEach(async (to, from, next) => {
	//404 page
	if (to.matched.length <= 0) {
		router.push({name: 'notFound'});
		return;
	}
	// if (to.meta.requiresQuery && to.meta.requiresQuery.some(q => !to.query[q])) {
    //     console.warn('[router] query unmet: ', from.path, to.path, to.query);
    //     next(false);
    //     return;
    // }
	if (to.matched.some(recode => recode.meta.requiresAuth)) {
		const hasAuth = await getUserAuth();
		if (!hasAuth) {
			next(false);
			return;
		}
	}
	next();
})
export default router;
