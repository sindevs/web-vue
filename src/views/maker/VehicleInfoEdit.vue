<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ແກ້ໄຂ ຂໍ້ມູນພາຫະນະ</h1>
            <LicensePlateInputForm v-if="showInputLicense" @on-license-plate-inputed="onLincensePlateInputed"/>
            <VehicleForm @on-save-vehicle="saveVehicle" v-if="vehicleToEdit" :vehicle-info="vehicleToEdit"
                         :show-go-back="true" :go-back-callback="resetEditForm"/>
        </div>

        <b-modal :active.sync="showVehicleSelection" :canCancel="true" :width="960" scroll="keep">
            <div class="modal-card">
                <section class="modal-card-body">
                    <div class="columns is-multiline ">
                        <div class="column" v-for="(v, index) in vehicleInfos" :key="v.idx">
                            <div class="box">
                                <LicencePlate :type_id="v.purpose_no" :license_no="v.license_no"
                                              :province_id="v.province_code" @click.native="vehicleDidSelected(index)"/>
                                <b-field grouped group-multiline position="is-centered">
                                    <div class="control">
                                        <b-taglist attached>
                                            <b-tag type="is-dark">ID</b-tag>
                                            <b-tag type="is-info">{{v.idx}}</b-tag>
                                        </b-taglist>
                                    </div>
                                    <div class="control">
                                        <b-taglist attached>
                                            <b-tag type="is-dark">ຍີ່ຫໍ້</b-tag>
                                            <b-tag type="is-info">{{v.make}}</b-tag>
                                            <b-tag type="is-dark">ລຸ້ນ</b-tag>
                                            <b-tag type="is-info">{{v.model}}</b-tag>
                                        </b-taglist>
                                    </div>
                                    <div class="control">
                                        <b-taglist attached>
                                            <b-tag type="is-dark">ເລກຈັກ</b-tag>
                                            <b-tag type="is-info">{{v.engine_no}}</b-tag>
                                            <b-tag type="is-dark">ເລກຖັງ</b-tag>
                                            <b-tag type="is-info">{{v.chassis_no}}</b-tag>
                                        </b-taglist>
                                    </div>
                                </b-field>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </b-modal>

    </section>
</template>

<script>
	import VehicleForm from "../../components/VehicleForm";
	import LicencePlate from "../../components/LicencePlate";
	import LicensePlateInputForm from "../../components/LicensePlateInputForm.vue";
	import RestAPI from "../../RestAPI";

	export default {
		name: "VehicleInfoEdit",
		components: {VehicleForm, LicencePlate, LicensePlateInputForm},
		data() {
			return {
				showInputLicense: true,
				vehicleToEdit: null,
				showVehicleSelection: false,
				vehicleInfos: []
			}
		},
		mounted() {
			console.log('vehicle edit mounted')
			//this.vehicle =
		},
		methods: {
			onLincensePlateInputed(license_no, province_code, purpose_no) {
				this.vehicleInfos = []
				RestAPI.queryVehicleInformation(license_no, province_code, purpose_no)
				.then(res => {
					if (res.data.length == 0) {
						this.$swal({
							text: 'ບໍ່ພົບຂໍ້ມູນ ປ້າຍ',
							type: 'error'
						})
						return
					}
					this.vehicleInfos = res.data
					if (this.vehicleInfos.length === 1) {
						this.vehicleToEdit = this.vehicleInfos[0]
						this.showInputLicense = false
					} else {
						this.showVehicleSelection = true
					}
				})
			},
			vehicleDidSelected(index) {
				this.showVehicleSelection = false
				this.showInputLicense = false
				this.vehicleToEdit = this.vehicleInfos[index]
			},
			saveVehicle(vehicle) {
				vehicle.idx = this.vehicleToEdit.idx
             vehicle.register_date = this.vehicleToEdit.register_date
				RestAPI.vehicleEdit(vehicle)
				.then(res => {
					this.$swal({
						text: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ',
						type: 'success'
					}).then(() => {
						//location.reload()
						this.$router.go();
					})
				}).catch(err => {
					this.$swal({
						text: JSON.stringify(err.response.data),
						type: 'error'
					})
				})

			},
			resetEditForm() {
				this.vehicleToEdit = null
				this.vehicleInfos = []
				this.showVehicleSelection = false
				this.showInputLicense = true
			}
		}
	}
</script>

<style scoped>

</style>