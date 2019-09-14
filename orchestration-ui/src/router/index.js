import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
	routes: [...routes],
	mode: 'history'
});

router.beforeEach(async (to, from, next) => {
	const isAuthenticated = !!store.getters['account/user'];
	if (isAuthenticated) {
		if (to.name === 'account.unauthorized') return next('/');
	} else {
		if (to.name === 'account.unauthorized') return next();
		return next({ name: 'account.unauthorized' });
	}
	return next();
});

export default router;
