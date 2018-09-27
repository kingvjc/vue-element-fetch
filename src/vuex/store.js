import Vue from 'vue';
import Vuex from 'vuex';
import env from './env';
import user from './user';
import nameRules from './nameRules';
Vue.use(Vuex);

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		env, user, nameRules
	}
})