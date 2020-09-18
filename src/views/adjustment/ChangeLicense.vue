<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ດັດແກ້ ປ່ຽນປ້າຍ (ຂ້າມປີ)</h1>


            <div class="columns">
                <div class="column ">
                    <div class="box">
                        <h1 class="title is-5">ປ້າຍເກົ່າ</h1>
                        <button class="button is-primary" @click="licenseDestination =0; showInputLicenseModal = true">
                            ເລືອກປ້າຍ
                        </button>
                        <div v-if="oldLicense">
                            <CompactVehicleInfo :vehicle-info="oldLicense"/>
                        </div>
                    </div>
                </div>
                <div class="column ">
                    <div class="box">
                        <h1 class="title is-5">ປ້າຍໃໝ່</h1>
                        <button class="button is-primary" @click="licenseDestination =1; showInputLicenseModal = true">
                            ເລືອກປ້າຍ
                        </button>
                        <div v-if="newLicense">
                            <CompactVehicleInfo :vehicle-info="newLicense"/>

                        </div>
                    </div>
                </div>
                <div class="column ">
                    <div class="box">
                        <h1 class="title is-5">ດຳເນີນການ</h1>
                        <div v-if="oldLicense && newLicense">
                            <p>1. ປິດປ້າຍ ID: <b>{{oldLicense.idx}}</b> ({{oldLicense.license_no}}
                                {{oldLicense.province_code | provinceName}} {{oldLicense.purpose_no | purposeName}})</p>
                            <p>2. ຍ້າຍການຊຳລະ <b>{{oldLicense.paymenthistory.length}}</b> ລາຍການ</p>
                            <article class="message is-warning" v-if="!isEngineMatch">
                                <div class="message-body">
                                    ເລກຈັກ ບໍ່ກົງກັນ
                                </div>
                            </article>
                            <article class="message is-warning" v-if="!isChassisMatch">
                                <div class="message-body">
                                    ເລກຖັງ ບໍ່ກົງກັນ
                                </div>
                            </article>
                            <article class="message is-warning" v-if="!isTypeMatch">
                                <div class="message-body">
                                    ປະເພດລົດ ບໍ່ກົງກັນ
                                </div>
                            </article>

                            <article class="message is-warning" v-if="isPaymentDuplicated">
                                <div class="message-body">
                                    ມີການຈ່າຍຊ້ຳປີກັນ
                                </div>
                            </article>

                            <button class="button is-danger" @click="saveChangeLicense">ບັນທຶກ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal :active.sync="showInputLicenseModal" has-modal-card width="auto">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">ປ້ອນເລກທະບຽນ</p>
                </header>
                <section class="modal-card-body">
                    <LicensePlateInputForm @on-license-plate-inputed="onLincensePlateInputed"/>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="showInputLicenseModal = false">Close</button>
                </footer>
            </div>
        </b-modal>
        <b-modal :active.sync="showVehicleSelection" :canCancel="true">
            <div class="modal-card">
                <section class="modal-card-body">
                    <div class="columns is-multiline ">
                        <div class="column" v-for="(v, index) in vehicleInfos" :key="v.idx">
                            <div class="box">
                                <LicencePlate :type_id="v.purpose_no" :license_no="v.license_no"
                                              :province_id="v.province_code" @click.native="vehicleDidSelected(index)"/>
                                <p class="has-text-centered">{{v.make}} {{v.model}}</p>
                                <p class="has-text-centered">ເລກຈັກ: {{v.engine_no }}</p>
                                <p class="has-text-centered">ເລກຖັງ: {{v.chassis_no}}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </b-modal>
    </section>
</template>

<script>
	import LicensePlateInputForm from "../../components/LicensePlateInputForm";
	import LicencePlate from "../../components/LicencePlate";
	import CompactVehicleInfo from "../../components/CompactVehicleInfo";

	import RestAPI from "../../RestAPI";

	export default {
		name: "ChangeLicense",
		components: {LicensePlateInputForm, CompactVehicleInfo, LicencePlate},
		data() {
			return {
				showInputLicenseModal: false,
				showVehicleSelection: false,
				licenseDestination: 0,
				vehicleInfos: [],
				newLicense: null,
				oldLicense: null
			}
		},
		computed: {
			isPaymentDuplicated() {
				if (!this.oldLicense) return false
				if (!this.newLicense) return false
				const p1 = this.oldLicense.paymenthistory.map(o => {
					return o.tax_year
				})
				const p2 = this.newLicense.paymenthistory.map(o => {
					return o.tax_year
				})
				const presents = this._.intersection(p1, p2)
				return presents.length > 0;
			},
			isEngineMatch() {
				return this.oldLicense.engine_no === this.newLicense.engine_no
			},
			isChassisMatch() {
				return this.oldLicense.chassis_no === this.newLicense.chassis_no
			},
			isTypeMatch() {
				return this.oldLicense.vehicletype_id === this.newLicense.vehicletype_id
			}
		},
		methods: {
			onLincensePlateInputed(license_no, province_code, purpose_no) {

				this.vehicleInfos = []
				RestAPI.queryPaymentInformation(license_no, province_code, purpose_no)
				.then(res => {
					if (res.data.length == 0) {
						this.$swal({
							text: 'ບໍ່ພົບຂໍ້ມູນ ປ້າຍ',
							type: 'error'
						})
						return
					}
					this.showInputLicenseModal = false
					this.vehicleInfos = res.data
					if (this.vehicleInfos.length == 1) {
						if (this.licenseDestination == 0) {
							this.oldLicense = this.vehicleInfos[0]
						} else {
							this.newLicense = this.vehicleInfos[0]
						}
					} else {
						this.showVehicleSelection = true
					}
					//this.showVehicleSelection = true
				})
			},
			vehicleDidSelected(index) {
				this.showVehicleSelection = false
				if (this.licenseDestination == 0) {
					this.oldLicense = this.vehicleInfos[index]
				} else {
					this.newLicense = this.vehicleInfos[index]
				}
			},
			saveChangeLicense() {
				if (!this.isEngineMatch || !this.isChassisMatch || this.isPaymentDuplicated || !this.isTypeMatch) {
					this.$swal({
						title: 'ມີ Waring ທ່ານຕ້ອງການ ດຳເນີນການຕໍ່ຫຼືບໍ່?',
						type: 'question',
						confirmButtonText: 'ແມ່ນ',
						showCancelButton: true,
						cancelButtonText: 'ບໍ່'
					}).then((result) => {
						if (result.value) {
							this.doChangeLicense()
						}
					})
				} else {
					//no warning...
					this.doChangeLicense()
				}
			}
			,
			doChangeLicense() {
				const req = {
					fromidx: this.oldLicense.idx,
					toidx: this.newLicense.idx
				}
				RestAPI.adjustmentChangeLicense(req)
				.then(res => {
					this.$swal({
						type: 'success',
						message: 'ສຳເລັດ'
					})
					this.oldLicense = null
					this.newLicense = null
				})
			}
		}
	}
</script>

<style scoped>

</style>