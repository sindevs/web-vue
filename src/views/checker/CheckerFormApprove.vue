<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ລາຍການ ລໍຖ້າອະນຸມັດ</h1>
            <b-table :data="convertedReports" :striped="true"
                     :bordered="true">
                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>ບໍ່ມີລາຍການ</p>
                        </div>
                    </section>
                </template>
                <template slot-scope="props">
                    <b-table-column field="formid" label="ເລກທີ" numeric centered>
                        {{ props.row.formid }}
                    </b-table-column>
                    <b-table-column field="sn" label="SN" numeric centered>
                        {{ props.row.formbody.sn }}
                    </b-table-column>
                    <b-table-column field="tax_year" label="ສົກປີ" numeric centered>
                        {{ props.row.formbody.stikcerinfo.tax_year }}
                    </b-table-column>
                    <b-table-column field="createdate" label="ວັນທີສ້າງ">
                        {{ props.row.createdate }}
                    </b-table-column>
                    <b-table-column field="formtype" label="ປະເພດ">
                        {{ props.row.formtype | formTypeName}}
                    </b-table-column>
                    <b-table-column field="formtype" label="ທະບຽນລົດ">
                        <LicencePlateCompact :license_no="props.row.licenseno" :province_id="props.row.provincecode"
                                             :type_id="props.row.purposeno"/>
                    </b-table-column>
                    <b-table-column field="makerid" label="ຜູ້ສ້າງ">
                        {{ props.row.makerid }}
                    </b-table-column>

                    <b-table-column label="Actions" custom-key="actions">
                        <div class="buttons are-small has-text-right">
                            <button class="button is-warning" @click="viewForm(props.row)">
                                <font-awesome-icon icon="search"></font-awesome-icon>
                            </button>
                            <button class="button is-primary">
                                <font-awesome-icon icon="check" @click="approveForm(props.row)"></font-awesome-icon>
                            </button>
                        </div>
                    </b-table-column>
                </template>
            </b-table>
        </div>
        <b-modal :active.sync="showSticker" has-modal-card width="960">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">ຂໍ້ມູນ Sticker</p>
                </header>
                <section class="modal-card-body">

                    <StickerInfo :sticker="showingSticker"/>

                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="showSticker = false">Close</button>
                </footer>
            </div>
        </b-modal>
    </section>
</template>

<script>
	import RestAPI from "../../RestAPI";
	import LicencePlate from "../../components/LicencePlate";
	import LicencePlateCompact from "../../components/LicencePlateCompact";
	import StickerInfo from "../../components/StickerInfo";

	export default {
		name: "CheckerFormApprove",
		components: {StickerInfo, LicencePlateCompact, LicencePlate},
		data() {
			return {
				forms: [],
				showSticker: false,
				showingSticker: null
			}
		},
		computed: {
			convertedReports() {
				return this.forms
			}
		},
		mounted() {
			this.loadPendingForms();
		},

		methods: {
			loadPendingForms() {
				RestAPI.checkerPendingFroms().then(response => {
					this.forms = response.data
				})
			},
			viewForm(form) {
				if (form.formtype === 'CANCELPAYMENT') {
					this.showingSticker = form.formbody.stikcerinfo
					this.showSticker = true

				} else {
					this.$swal({
						type: 'error',
						text: 'ບໍ່ສາມາດເບິ່ງໄດ້'
					})
				}

			},
			approveForm(form) {
				console.log(form)
				RestAPI.approveForm(form.formid)
				.then(res => {
					this.$swal({
						type: 'success',
						text: 'ອະນຸມັດລາຍການສຳເລັດ'
					})
					this.loadPendingForms();
				})
				.catch(err => {
					console.log(err)
					let msg = 'ມີຂໍ້ຜິດພາດ';
					if (err.response != undefined && err.response.data != undefined) {
						if (typeof err.response.data === 'string') {
							msg = err.response.data
						} else if (typeof err.response.data === 'object') {
							msg = err.response.data.message
						}

					}
					this.$swal({
						type: 'error',
						text: msg
					})
				})
			}
		}
	}
</script>

<style scoped>

</style>