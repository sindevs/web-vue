<template>
    <div class="is-fullwidth">
        <div v-if="showInputLicense">
            <LicensePlateInputForm @on-license-plate-inputed="onLincensePlateInputed"/>
        </div>
        <div v-if="showLicensePlate" class="has-text-centered field">
            <div class="box is-danger">
                <b-tooltip label="ກົດເພື່ອປ້ອນໃໝ່">
                    <LicencePlate :license_no="inputLicense" :province_id="inputProvince" :type_id="inputPurpose"
                                  @click.native="clearLicense"/>
                </b-tooltip>
            </div>

        </div>
        <div v-if="showInputForm">
            <b-field grouped>
                <b-field label="ເລກຈັກ" expanded
                         :type="{'is-danger': errors.has('inputEngineNo'), 'is-success': !errors.has('inputEngineNo') && fieldTouched('inputEngineNo')}"
                         :message="errors.first('inputEngineNo')">
                    <b-input v-model="inputEngineNo" v-validate="'required|alpha_num'" name="inputEngineNo"></b-input>
                </b-field>
                <b-field label="ເລກຖັງ" expanded
                         :type="{'is-danger': errors.has('inputChassisNo'), 'is-success': !errors.has('inputChassisNo') && fieldTouched('inputChassisNo')}"
                         :message="errors.first('inputChassisNo')">
                    <b-input v-model="inputChassisNo" v-validate="'required|alpha_num'" name="inputChassisNo"></b-input>
                </b-field>
            </b-field>
            <b-field grouped>
                <b-field label="ຄວາມແຮງ (CC)" expanded
                         :type="{'is-danger': errors.has('inputCc'), 'is-success': !errors.has('inputCc') && fieldTouched('inputCc')}"
                         :message="errors.first('inputCc')">
                    <b-input v-model="inputCc" placeholder="ຈຳນວນເປັນ cc ເທົ່ານັ້ນ"
                             v-validate="'required|numeric'" name="inputCc"></b-input>
                </b-field>
                <b-field label="ວັນທີອອກທະບຽນ" expanded
                         :type="{'is-danger': errors.has('inputIssueDate'), 'is-success': !errors.has('inputIssueDate') && fieldTouched('inputIssueDate')}"
                         :message="errors.first('inputIssueDate')">
                    <b-datepicker
                            :date-formatter="BcelDateFormatter"
                            :date-parser="BcelDateParser"
                            placeholder="dd/mm/yyyy"
                            v-model="inputIssueDate"
                            editable
                            v-validate="'required|date_format:DD/MM/YYYY'" name="inputIssueDate"></b-datepicker>
                </b-field>
            </b-field>

            <b-field label="ຊື່ເຈົ້າຂອງ" expanded
                     :type="{'is-danger': errors.has('inputOwnerName'), 'is-success': !errors.has('inputOwnerName') && fieldTouched('inputOwnerName')}"
                     :message="errors.first('inputOwnerName')">
                <b-input v-model="inputOwnerName" name="inputOwnerName" v-validate="'required'"/>
            </b-field>

            <b-field grouped>
                <b-field label="ຍີ່ຫໍ້" expanded
                         :type="{'is-danger': errors.has('inputMake'), 'is-success': !errors.has('inputMake') && fieldTouched('inputMake')}"
                         :message="errors.first('inputMake')">
                    <b-input v-model="inputMake" placeholder="TOYOTA" name="inputMake"
                             v-validate="'required'"></b-input>
                </b-field>
                <b-field label="ລຸ້ນ" expanded>
                    <b-input v-model="inputModel" placeholder="Revo"></b-input>
                </b-field>
            </b-field>
            <b-field grouped>
                <b-field label="ປະເພດລົດ" expanded
                         :type="{'is-danger': errors.has('inputVehicleType'), 'is-success': !errors.has('inputVehicleType')  && fieldTouched('inputVehicleType')}"
                         :message="errors.first('inputVehicleType')">
                    <multiselect
                            :class="{'is-danger': errors.has('inputVehicleType'), 'is-success': !errors.has('inputVehicleType')  && fieldTouched('inputVehicleType')}"
                            placeholder="ປະເພດລົດ"
                            v-model="inputVehicleType"
                            label="vehicletype"
                            track-by="vehicletype_id"
                            :options="getVehicleTypes"
                            name="inputVehicleType"
                            v-validate="'required'"
                    >
                    </multiselect>
                </b-field>
                <b-field label="ຈຸດປະສົງການນຳໃຊ້" expanded
                         :type="{'is-danger': errors.has('inputVehicleCategory'), 'is-success': !errors.has('inputVehicleCategory') && fieldTouched('inputVehicleCategory')}"
                         :message="errors.first('inputVehicleCategory')">
                    <multiselect
                            :class="{'is-danger': errors.has('inputVehicleCategory'), 'is-success': !errors.has('inputVehicleCategory') && fieldTouched('inputVehicleCategory')}"
                            placeholder="ຈຸດປະສົງການນຳໃຊ້"
                            v-model="inputVehicleCategory"
                            label="category_name"
                            track-by="category_id"
                            :ref="inputVehicleCategory"
                            :options="getVehicleCategories"
                            name="inputVehicleCategory"
                            v-validate="'required'"
                    >

                    </multiselect>
                </b-field>
            </b-field>
            <b-field grouped>
                <b-field label="ນ້ຳໜັກ" expanded
                         :type="{'is-danger': errors.has('inputWeight'), 'is-success': !errors.has('inputWeight')  && fieldTouched('inputWeight')}"
                         :message="errors.first('inputWeight')">
                    <b-input v-model="inputWeight" placeholder="ໂຕນ" name="inputWeight"></b-input>
                </b-field>
                <b-field label="ບ່ອນນັ່ງ" expanded
                         :type="{'is-danger': errors.has('inputSeat'), 'is-success': !errors.has('inputSeat')  && fieldTouched('inputSeat')}"
                         :message="errors.first('inputSeat')">
                    <b-input v-model="inputSeat" placeholder="ບ່ອນນັ່ງ" name="inputSeat"></b-input>
                </b-field>
            </b-field>

            <b-field grouped position="is-centered">
                <p class="control">
                    <button class="button is-primary" @click="onSaveClicked">ບັນທຶກ</button>
                </p>
                <p class="control">
                    <button class="button" @click="onResetClicked">ເລີ່ມໃໝ່</button>
                </p>
                <p class="control" v-if="showGoBack">
                    <button class="button is-info" @click="goBackCallback">ກັບຄືນ</button>
                </p>
            </b-field>

        </div>
    </div>
</template>

<script>
	import {get} from 'vuex-pathify'
	import Multiselect from 'vue-multiselect'
	import LicencePlate from "./LicencePlate";
	import BField from "buefy/src/components/field/Field";
	import LicensePlateInputForm from "./LicensePlateInputForm";
	import BInput from "buefy/src/components/input/Input";
	import {Validator} from 'vee-validate';
	import moment from 'moment'

	export default {
		name: "VehicleForm",
		components: {BInput, LicensePlateInputForm, BField, LicencePlate, Multiselect},
		props: {
			vehicleInfo: {
				type: Object,
				required: false
			},
			showGoBack: {
				type: Boolean,
				default: false
			},
			goBackCallback: Function
		},
		computed: {
			getProvinces: get('provinces'),
			getPlateTypes: get('vehiclePurposes'),
			getVehicleTypes: get('vehicleTypes'),
			getVehicleCategories: get('vehicleCategories')
		},
		data() {
			return {
				showInputLicense: true,
				showLicensePlate: false,
				showInputForm: false,
				inputLicense: '',
				inputProvince: '',
				inputPurpose: '',
				inputEngineNo: '',
				inputChassisNo: '',
				inputCc: '',
				inputIssueDate: null,
				inputOwnerName: '',
				inputMake: '',
				inputModel: '',
				inputWeight: '',
				inputSeat: '',
				inputVehicleType: null,
				inputVehicleCategory: null
			}
		},
		methods: {
			clearLicense() {
				console.log('clear license')
				this.inputLicense = ''
				this.inputProvince = ''
				this.inputPurpose = ''
				this.showInputLicense = true
				this.showLicensePlate = false
			},
			clearAllInput() {
				this.showInputLicense = true
				this.showLicensePlate = false
				this.showInputForm = false
				this.inputLicense = ''
				this.inputProvince = ''
				this.inputPurpose = ''
				this.inputEngineNo = ''
				this.inputChassisNo = ''
				this.inputCc = ''
				this.inputIssueDate = null
				this.inputOwnerName = ''
				this.inputMake = ''
				this.inputModel = ''
				this.inputWeight = ''
				this.inputSeat = ''
				this.inputVehicleType = null
				this.inputVehicleCategory = null
			},
			onLincensePlateInputed(license_no, province_code, purpose_no) {
				this.inputLicense = license_no;
				this.inputProvince = province_code;
				this.inputPurpose = purpose_no;
				this.showInputLicense = false;
				this.showLicensePlate = true;
				this.showInputForm = true;
			},
			async onSaveClicked() {
				//validate license
				this.validateLicense();
				this.validateSeatAndWeight();
				const isvalid = await this.$validator.validate();
				console.log(this.errors)
				if (!isvalid || this.errors.any()) {
					this.$swal({
						text: 'ກະລຸນາ ກວດຄືນ ຂໍ້ມູນ',
						type: 'error'
					})
					return;
				}
				const ve = {
					license_no: this.inputLicense,
					purpose_no: this.inputPurpose,
					province_code: this.inputProvince,
					engine_no: this.inputEngineNo,
					chassis_no: this.inputChassisNo,
					cc: this.inputCc,
					issue_date: this.inputIssueDate,
					owner_name: this.inputOwnerName,
					make: this.inputMake,
					model: this.inputModel,
					weight: this.inputWeight,
					seats: this.inputSeat,
					vehicletype_id: this.inputVehicleType.vehicletype_id,
					category_id: this.inputVehicleCategory.category_id
				}
				this.$emit('on-save-vehicle', ve)

			},
			async validateSeatAndWeight() {
				this.errors.remove('inputSeat');
				this.errors.remove('inputWeight');
				const v = new Validator();
				if (this.inputVehicleCategory != null) {
					const requires = this.inputVehicleCategory.requires ? this.inputVehicleCategory.requires : [];
					//console.log('requires', requires)
					if (requires.includes('seat')) {
						const seatrequire = await v.verify(this.inputSeat, 'numeric|required')
						//console.log(seatrequire)
						if (!seatrequire.valid) {
							this.errors.add({
								field: 'inputSeat',
								msg: seatrequire.errors[0].replace('{field}', 'inputSeat')
							})
						}
					}
					if (requires.includes('weight')) {
						const weightRequire = await v.verify(this.inputWeight, 'decimal:3|required|min:1')
						//console.log(weightRequire)
						if (!weightRequire.valid) {
							this.errors.add({
								field: 'inputWeight',
								msg: weightRequire.errors[0].replace('{field}', 'inputWeight')
							})
						}
					}
				}
			},
			validateLicense() {
				this.errors.remove('inputLicense');
				this.errors.remove('inputProvince');
				this.errors.remove('inputPurpose');
				if (this.inputLicense === '') {
					this.errors.add({
						field: 'inputLicense',
						msg: 'required'
					})
				}
				if (this.inputProvince === '') {
					this.errors.add({
						field: 'inputProvince',
						msg: 'required'
					})
				}
				if (this.inputPurpose === '') {
					this.errors.add({
						field: 'inputPurpose',
						msg: 'required'
					})
				}
			},
			mapVehicleInfo() {
				this.inputLicense = this.vehicleInfo.license_no
				this.inputPurpose = this.vehicleInfo.purpose_no
				this.inputProvince = this.vehicleInfo.province_code
				this.inputEngineNo = this.vehicleInfo.engine_no
				this.inputChassisNo = this.vehicleInfo.chassis_no
				this.inputCc = this.vehicleInfo.cc
				const isdate = new moment(this.vehicleInfo.issue_date, 'YYYY-MM-DD');
				if (isdate.isValid()) {
					this.inputIssueDate = isdate.toDate()
				}
				this.inputOwnerName = this.vehicleInfo.owner_name
				this.inputMake = this.vehicleInfo.make
				this.inputModel = this.vehicleInfo.model
				this.inputWeight = this.vehicleInfo.weight
				this.inputSeat = this.vehicleInfo.seats
				this.inputVehicleType = this._.find(this.getVehicleTypes, ['vehicletype_id', this.vehicleInfo.vehicletype_id])
				this.inputVehicleCategory = this._.find(this.getVehicleCategories, ['category_id', this.vehicleInfo.category_id])
			},
			onResetClicked() {
				this.clearAllInput()
				if (this.vehicleInfo != undefined) {
					this.mapVehicleInfo()
					this.showInputLicense = false;
					this.showLicensePlate = true;
					this.showInputForm = true;
					//todo: force validate
				}
			}
		},
		async mounted() {
			console.log('form mounted')
			/*this.errors.add({
				field: 'inputWight',
				msg: 'required'
			})*/
			console.log('vehicleInfo', this.vehicleInfo)
			if (this.vehicleInfo != undefined) {
				this.mapVehicleInfo();
				this.showInputLicense = false;
				this.showLicensePlate = true;
				this.showInputForm = true;
				//todo: force validate
			}

		}
	}
</script>

<style scoped>
    .multiselect__placeholder, .multiselect {
        white-space: nowrap !important;
    }
</style>