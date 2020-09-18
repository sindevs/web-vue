import axios from 'axios'
//import store from './store'

export default {
	login(credential) {
		return axios.post('/v1/auth', credential)
	},
	getProvinces() {
		return axios.get('v1/data/provinces')
	},
	getLicensePurposes() {
		return axios.get('v1/data/vehicle/purposes')
	},
	getVehicleTypes() {
		return axios.get('v1/data/vehicle/types')
	},
	getGlossary() {
		return axios.get('v1/data/glossary')
	},
	getVehicleCategories() {
		return axios.get('v1/data/vehicle/categories')
	},
	queryPaymentInformation(licenseno, provincecode, purposeno) {
		return axios.get(`v1/payment/query/${licenseno}/${provincecode}/${purposeno}`)
	},
	queryVehicleInformation(licenseno, provincecode, purposeno) {
		return axios.get(`v1/vehicle/query/${licenseno}/${provincecode}/${purposeno}`)
	},
	adjustmentChangeLicense(request) {
		return axios.post('v1/adjustment/license/change', request)
	},
	vehicleRegistration(request) {
		return axios.post('v1/vehicle/registration', request)
	},
	vehicleEdit(request) {
		return axios.post('v1/vehicle/edit', request)
	},
	makerReportVehicleRegistration(startdate, enddate) {
		return axios.get(`v1/report/maker/vehicle/registration/${startdate}/${enddate}`)
	},
	makerReportVehicleEdit(startdate, enddate) {
		return axios.get(`v1/report/maker/vehicle/edit/${startdate}/${enddate}`)
	},
	makerReportPayment(startdate, enddate) {
		return axios.get(`v1/report/maker/payment/${startdate}/${enddate}`)
	}, makerUnsettleReport() {
		return axios.get(`v1/report/maker/unsettle`)
	},
	makerMakePayment(request) {
		return axios.post('v1/payment/create', request)
	},
	getSticker(sn) {
		return axios.get(`v1/payment/receive/${sn}`)
	},
	setStickerPrinted(request) {
		return axios.post('v1/payment/sticker/printed', request)
	},
	cancelPayment(request) {
		return axios.post('v1/payment/cancel', request)
	},
	reprintSticker(request) {
		return axios.post('v1/sticker/reprint', request)
	},
	getusers() {
		return axios.get('v1/user/all')
	},
	stickerReprint(request) {
		return axios.post('v1/payment/receive/reprint', request)
	},
	getBranches() {
		return axios.get(`v1/data/branches`)
	},
	getUnits() {
		return axios.get(`v1/data/units`)
	},
	getRoles() {
		return axios.get(`v1/data/roles`)
	},
	userRegistration(request) {
		return axios.post('v1/user/register', request)
	},
	resetselfpassword(params) {
		return axios.post('v1/user/selfresetpass', params);
	},
	resetpassword(params) {
		return axios.post('v1/user/resetpass', params);
	},
	updateuser(params) {
		return axios.post('v1/user/updateuser', params);
	},
	edituser(params) {
		return axios.post('v1/user/edit', params);
	},
	receivePrinted(request) {
		return axios.post('v1/payment/receive/printed', request)
	},
	checkerPendingFroms() {
		return axios.get('v1/checker/form/pendings')
	},
	approveForm(formid) {
		return axios.patch(`v1/checker/form/approve/${formid}`, {})
	},
	addbranch(params) {
		return axios.post('v1/data/addbranch', params)
	},
	addunit(params) {
		return axios.post('v1/data/addunit', params)
	},
	adminReportPayment(startdate, enddate) {
		return axios.get(`v1/report/admin/payment/${startdate}/${enddate}`)
	},
	checkerReportPayment(startdate, enddate) {
		return axios.get(`v1/report/checker/payment/${startdate}/${enddate}`)
	},
	makerReportCancel(startdate, enddate) {
		return axios.get(`v1/report/maker/payment/cancel/${startdate}/${enddate}`)
	},
	makerReprintReport(startdate, enddate) {
		return axios.get(`v1/report/maker/reprint/${startdate}/${enddate}`)
	},
	makerPrintOnlineReport(startdate, enddate) {
		return axios.get(`v1/report/maker/printonline/${startdate}/${enddate}`)
	},
	getFormBySn(sn) {
		return axios.get(`v1/payment/form/${sn}`);
	},
	makerMakePaymorePayment(request) {
		return axios.post('v1/payment/paymore', request)
	},
}
