<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ພິມສະຕິກເກີ້ (ສຳລັບການບໍລິການດ້ວຍຕົນເອງ/BCEL One)</h1>
            <div class="box">
                <b-field>
                    <b-input v-model.number="inputSeqNo" expanded placeholder="ປ້ອນເລກ SN"
                             @keyup.enter.native="getSticker"/>
                    <div class="control">
                        <button class="button is-primary" :disabled="inputSeqNo.length === 0"
                                @click="getSticker">ຄົ້ນຫາ
                        </button>
                    </div>
                </b-field>
                <div v-if="sticker">
                    <LicencePlate :license_no="sticker.license_no" :province_id="sticker.province_code"
                                  :type_id="sticker.purpose_no"/>
                    <StickerInfo :sticker="sticker"/>
                    <div style="padding: 15px">
                        <b-field grouped position="is-centered">

                            <b-input v-model="inputCustomerName" placeholder="ຊື່ລູກຄ້າ"></b-input>


                            <b-input v-model="inputContactNo" placeholder="ເບີຕິດຕໍ່"></b-input>


                            <div class="control">
                                <button class="button is-info button130" :disabled="sticker.is_printed === 1">
                                    ພິມໃບຮັບຊຳລະ
                                </button>
                            </div>
                            <div class="control">
                                <button class="button is-primary button130"
                                        :disabled="sticker.is_printed === 1 || (inputCustomerName.length === 0 || inputContactNo.length === 0)"
                                        @click="printSticker">
                                    ພິມສະຕິກເກີ້
                                </button>
                            </div>
                            <div class="control">
                                <button class="button button130" @click="sticker = null; inputSeqNo = ''">ເລີ່ມໃໝ່
                                </button>
                            </div>
                        </b-field>
                    </div>

                </div>
            </div>
        </div>

    </section>
</template>

<script>
	import BField from "buefy/src/components/field/Field";
	import BInput from "buefy/src/components/input/Input";
	import RestAPI from "../../RestAPI";
	import LicencePlate from "../../components/LicencePlate";
	import StickerInfo from "../../components/StickerInfo";

	export default {
		name: "PrintSticker",
		components: {StickerInfo, LicencePlate, BInput, BField},
		data() {
			return {
				inputSeqNo: '',
				sticker: null,
				inputContactNo: '',
				inputCustomerName: ''
			}
		},
		methods: {
			getSticker() {
				RestAPI.getSticker(this.inputSeqNo)
				.then(res => {
					this.sticker = res.data
					if (this.sticker.is_printed != 0) {
						this.$swal({
							type: 'warning',
							text: 'ສະຕິກເກີ້ ຖືກພິມແລ້ວ'
						})
					}
				})
				.catch(err => {
					console.log(err)
					this.$swal({text: 'ບໍ່ສາມາດ ດຶງຂໍ້ມູນ', type: 'error'})
				})
			},
			printSticker() {
				this.$swal({
					type: 'warning',
					text: 'ທ່ານຕ້ອງການພິມ ແທ້ຫຼືບໍ່?',
					showCancelButton: true,
					confirmButtonText: 'ແມ່ນແລ້ວ',
					cancelButtonText: 'ບໍ່!'
				}).then(res => {
					if (res.value) {
						this.updateSticker()
					}
				})
			},
			updateSticker() {

				const {tax_cat, province, vehicletype, vehicletype_id, category_id, license_no, tax_year, payment_date, seq_no, chassis_no, print_amt, cc, seats, weight, print_count, purpose_no} = this.sticker;
				const wrange = this.weightRangeByCat(tax_cat);
				const ccrange = this.ccRangeByCat(tax_cat);
				const srange = this.seatRangeByCat(tax_cat);
				const liprefix = license_no.replace(/^([ກ-ຮ]+)(.*)$/gi, '$1');
				const stickerinfo = {
					province,
					vehicletype,
					vehicletypeid: vehicletype_id,
					categoryid: category_id === null? 1:category_id ,
					weightrange: wrange,
					seats: srange,
					ccrange: ccrange,
					licenseno: liprefix + ' ' + license_no.substr(liprefix.length),
					platetype: this.$options.filters.purposeName(purpose_no),
					taxyear: tax_year,
					paiddate: payment_date.substr(0, 10),
					taxamount: this.$options.filters.formatNumberLocal(print_amt) + ' ກີບ',
					sn: seq_no,
					chassisno: chassis_no,
					printcount: print_count,
					purposeno: purpose_no,
					platecolor: this.$options.filters.purposeDesc(purpose_no) + ' - ' + (category_id === null? 1:category_id)
				}
				const printcmd = JSON.stringify(stickerinfo);
				console.log(printcmd);
				/* eslint-disable */
				this.req = {
					sn: seq_no,
					formid: this.sticker.batch_id
				}
				const printres = undefined === window.nativeFunction ? 0 : window.nativeFunction.printsticker(printcmd)
				/* eslint-enable */

				if (printres != 1) {
					this.$swal({
						text: 'ບໍ່ສຳເລັດ ກະລຸນາ ກວດຄືນເຄື່ອງພິມ',
						type: 'error'
					})
					return;
				}


				const request = {
					sn: this.sticker.seq_no,
					customername: this.inputCustomerName,
					contactno: this.inputContactNo
				}
				RestAPI.setStickerPrinted(request)
				.then(res => {
					this.sticker = res.data
					console.log('set print success', res.data)
				})
				.catch(err => {
					console.log('set print error ', err)
				})

			}
		}
	}
</script>

<style scoped>
    .button130 {
        width: 130px;
    }
</style>