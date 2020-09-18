import MakerHome from '@/views/maker/MakerHome.vue'
import CheckerFormApprove from '@/views/checker/CheckerFormApprove.vue'
import CheckerReportPayment from '@/views/checker/CheckerReportPayment.vue'

export default [
	{
		path: '/checker',
		component: MakerHome,
		meta: { requiresAuth: true },
		children: [
			{
				path: 'form/approve',
				component: CheckerFormApprove,
				name: 'checker-form-approve',
				meta: { requiresAuth: true }
			},
			{
				path: 'report/payments',
				component: CheckerReportPayment,
				name: 'checker-report-payment',
				meta: { requiresAuth: true }
			}
		]
	}
]