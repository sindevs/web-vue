import AdminHome from '@/views/admin/AdminHome.vue'
import UserRegistration from '@/views/admin/UserRegistration.vue'
import AdminReportPayments from '@/views/admin/AdminReportPayments.vue'

export default [
    {
        path: '/admin',
        component: AdminHome,
        meta: {requiresAuth: true},
        children: [
            {
                path: 'user/registration',
                component: UserRegistration,
                name: 'user-registration',
                meta: { requiresAuth: true }
            },
            {
                path: 'report/payments',
                name: 'adminpayments',
                component: AdminReportPayments,
                meta: { requiresAuth: true }
            },
        ]
    }
]