import MakerHome from '@/views/maker/MakerHome.vue'
import VehicleRegistration from '@/views/maker/VehicleRegistration.vue'
import VehicleInfoEdit from '../views/maker/VehicleInfoEdit.vue'
import VehicleRegistrationReport from '../views/maker/VehicleRegistrationReport.vue'
import VehicleEditReport from '../views/maker/VehicleEditReport.vue'
import PaymentReport from '../views/maker/PaymentReport.vue'
import Payment from '../views/maker/Payment.vue'
import UnsettleReport from '../views/maker/UnsettleReport.vue'
import PrintSticker from '../views/maker/PrintSticker.vue'
import ReprintSticker from '../views/maker/ReprintSticker.vue'
import CancelPayment from "../views/maker/CancelPayment";
import MakerForms from "../views/maker/MakerForms";
import PaymentCancelForms from "../views/maker/PaymentCancelForms";
import MakerPaymentForms from "../views/maker/MakerPaymentForms";
import MakerReprintForms from "../views/maker/MakerReprintForms";
import MakerPrintOnlineForms from "../views/maker/MakerPrintOnlineForms";
import MakerPrintOnlineReceipt from "../views/maker/MakerPrintOnlineReceipt";
import PaymorePayment from "../views/maker/PaymorePayment";

export default [
	{
		path: '/maker',
		component: MakerHome,
		meta: {requiresAuth: true},
		children: [
			{
				path: 'forms',
				component: MakerForms,
				name: 'maker-forms',
				meta: {requiresAuth: true}
			},
			{
				path: 'forms/payment/cancel',
				component: PaymentCancelForms,
				name: 'maker-payment-cancel-forms'
			},
			{
				path: 'forms/reprint',
				component: MakerReprintForms,
				name: 'maker-reprint-forms'
			}, {
				path: 'forms/printonline',
				component: MakerPrintOnlineForms,
				name: 'maker-printonline-forms'
			},
			{
				path: 'forms/payment',
				component: MakerPaymentForms,
				name: 'maker-payment-forms'
			},
			{
				path: 'vehicle/registration',
				component: VehicleRegistration,
				name: 'vehicle-registration'
			},
			{
				path: 'vehicle/edit',
				component: VehicleInfoEdit,
				name: 'vehicle-edit',
				meta: {requiresAuth: true}
			}
			,
			{
				path: 'report/vehicle/registration',
				component: VehicleRegistrationReport,
				name: 'vehicle-registration-report',
				meta: {requiresAuth: true}
			},
			{
				path: 'report/vehicle/edit',
				component: VehicleEditReport,
				name: 'vehicle-edit-report',
				meta: {requiresAuth: true}
			},
			{
				path: 'report/payment',
				component: PaymentReport,
				name: 'payment-report',
				meta: {requiresAuth: true}
			},
			{
				path: 'payment',
				component: Payment,
				name: 'vehicle-payment',
				meta: {requiresAuth: true}
			},
			{
				path: 'unsettle',
				component: UnsettleReport,
				name: 'unsettle',
				meta: {requiresAuth: true}
			},
			{
				path: 'sticker/print',
				component: PrintSticker,
				name: 'printsticker',
				meta: {requiresAuth: true}
			},
			{
				path: 'sticker/reprint',
				component: ReprintSticker,
				name: 'reprintsticker',
				meta: {requiresAuth: true}
			},
			{
				path: 'payment/cancel',
				component: CancelPayment,
				name: 'payment-cancel',
				meta: {requiresAuth: true}
			},
			{
				path: 'print/onlinereceipt',
				component: MakerPrintOnlineReceipt,
				name: 'print-onlinereceipt',
				meta: {requiresAuth: true}
			},
			{
				path: 'paymore',
				component: PaymorePayment,
				name: 'maker-paymore'
			}
		]
	}
]