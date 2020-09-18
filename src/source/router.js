import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import ManageUsers from "./views/admin/ManageUsers.vue";
import ManageBranches from "./views/admin/ManageBranches.vue";
import ChangeLicense from "./views/adjustment/ChangeLicense.vue";
import PaymentCorrection from "./views/adjustment/PaymentCorrection.vue";
import store from "./store";
import makerRoutes from './routes/makerRoutes';
import adminRoutes from './routes/adminRoutes';
import checkerRoutes from './routes/checkerRoutes'
import ChangeUserPassword from "./views/ChangeUserPassword";
import UserProfile from "./views/UserProfile";
import VehicleViewer from "./views/VehicleViewer";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
			meta: { requiresAuth: true }
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ "./views/About.vue")
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/changepassword',
			name: 'changepassword',
			component: ChangeUserPassword,
			meta: { requiresAuth: true }
		},
		{
			path: '/profile',
			name: 'profile',
			component: UserProfile,
			meta: { requiresAuth: true }
		},
		{
			path: '/vehicle/view',
			name: 'vehicle-viewer',
			component: VehicleViewer,
			meta: { requiresAuth: true }
		},
		{
			path: '/adjustment/changelicense',
			name: 'changelicense',
			component: ChangeLicense,
			meta: { requiresAuth: true }
		}, {
			path: '/adjustment/paymentcorrection',
			name: 'paymentcorrection',
			component: PaymentCorrection,
			meta: { requiresAuth: true }
		},
		{
			path: '/admin/users',
			name: 'users',
			component: ManageUsers,
			meta: { requiresAuth: true }
		},
		{
			path: '/admin/branches',
			name: 'branches',
			component: ManageBranches,
			meta: { requiresAuth: true }
		},
		{
			path: '*',
			name: '404',
			component: () =>
				import(/* webpackChunkName: "notfound" */ '@/views/NotFound.vue')
		}
	].concat(makerRoutes, checkerRoutes, adminRoutes)
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
	const token = store.get('token')
	if (requiresAuth && !token) {
		next('/login')
	} else if (requiresAuth && token) {
		const exp = store.get('tokeninfo@exp')

		const now = new Date().getTime() / 1000 //time in second
		if (exp >= now) {
			next()
		} else {
			Vue.swal({
				type: "error",
				text: "ໝົດເວລາ ນຳໃຊ້ລະບົບ, ກະລຸຸນາ ເຂົ້າລະບົບອີກຄັ້ງ"
			})
			next('/login')
		}
	} else {
		next()
	}

})

export default router;