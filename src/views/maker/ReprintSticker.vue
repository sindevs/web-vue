<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ພິມສະຕິກເກີ້ ຄືນ ຕຶ</h1>

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
                            <b-select v-model="reason" placeholder="ເຫດຜົນ">
                                <option value="1">
                                    ພິມບໍ່ອອກ
                                </option>
                                <option value="3">
                                    ລູກຄ້າ ຂໍພິມຄືນ
                                </option>
                            </b-select>

                            <div class="control">
                                <button class="button is-info button130"
                                        :disabled="sticker.is_printed === 0 || (inputCustomerName.length === 0 || inputContactNo.length === 0 || reason === null) || form"
                                        @click="saveReprintRequest">
                                    ບັນທຶກ
                                </button>
                            </div>
                            <div class="control">
                                <button class="button is-primary button130"
                                        :disabled="form == null || form.formbody.isprinted === 1"
                                        @click="printSticker">
                                    ພິມ
                                </button>
                            </div>

                            <div class="control">
                                <button class="button button130"
                                        @click="startOver">
                                    ເລີ່ມໃໝ່
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
	import LicensePlateInputForm from "../../components/LicensePlateInputForm";
	import RestAPI from "../../RestAPI";
	import LicencePlate from "../../components/LicencePlate";
	import StickerInfo from "../../components/StickerInfo";
	import BSelect from "buefy/src/components/select/Select";

	export default {
		name: "ReprintSticker",
		components: {BSelect, StickerInfo, LicencePlate, LicensePlateInputForm, BInput, BField},
		data() {
			return {
				inputSeqNo: '',
				sticker: null,
				inputContactNo: '',
				inputCustomerName: '',
				reason: null,
				form: null
			}
		},
		methods: {
			getSticker() {
				RestAPI.getSticker(this.inputSeqNo)
				.then(res => {
					this.sticker = res.data
					this.form = null
					this.inputCustomerName = '';
					this.inputContactNo = '';
					this.reason = null;
					if (this.sticker.is_printed !== 1) {
						this.$swal({
							type: 'warning',
							text: 'ບໍ່ສາມາດ ຂໍພິມຄືນໄດ້, ກະລຸນາ ພິມຜ່ານເມນູ  *ພິມສະຕິກເກີ້ (ການບໍລິການດ້ວຍຕົນເອງ/BCEL One)*'
						})
					}
				})
				.catch(err => {
					console.log(err)
					this.$swal({text: 'ບໍ່ສາມາດ ດຶງຂໍ້ມູນ', type: 'error'})
				})
			},
			printSticker() {
				console.log('print', this.sticker)
				if (this.form == null) {
					return;
				}
				const {tax_cat, province, vehicletype, vehicletype_id, category_id, license_no, tax_year, payment_date, seq_no, chassis_no, print_amt, cc, seats, weight, print_count, purpose_no} = this.sticker
				const wrange = this.weightRangeByCat(tax_cat);
				const ccrange = this.ccRangeByCat(tax_cat);
				const srange = this.seatRangeByCat(tax_cat);
				const liprefix = license_no.replace(/^([ກ-ຮ]+)(.*)$/gi, '$1');
				const stickerinfo = {
					province,
					vehicletype,
					vehicletypeid: vehicletype_id,
					categoryid: category_id,
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
					platecolor: this.$options.filters.purposeDesc(purpose_no) + ' - ' + category_id
				}
				const printcmd = JSON.stringify(stickerinfo);
				console.log(printcmd);
				/* eslint-disable */
				this.req = {
					sn: seq_no,
					formid: this.sticker.batch_id
				}
				console.log('nativeFunc', window.nativeFunction);
				const printres = undefined === window.nativeFunction ? 0 : window.nativeFunction.printsticker(printcmd)
				/* eslint-enable */

				if (printres != 1) {
					this.$swal({
						text: 'ບໍ່ສຳເລັດ ກະລຸນາ ກວດຄືນເຄື່ອງພິມ',
						type: 'error'
					})
					return;
				}

				let req = {
					sn: this.sticker.seq_no,
					formid: this.form.formid
				}
				RestAPI.receivePrinted(req).then(res => {
					this.form = res.data
					this.$swal({text: 'ພິມ ສຳເລັດ'})
				})

				.catch(err => {
					console.log('set receive printe error ', err)
				})
			},
			saveReprintRequest() {
				this.$swal({
					type: 'question',
					text: `ທ່ານຕ້ອງການ ພິມຄືນ SN: ${this.sticker.seq_no} ແທ້ບໍ່?`
				}).then(res => {
					if (res.value) {
						let req = {
							sn: this.sticker.seq_no,
							customername: this.inputCustomerName,
							contactno: this.inputContactNo,
							reason: this.reason
						}
						RestAPI.stickerReprint(req).then(res => {
							this.form = res.data
							this.$swal({text: 'ບັນທຶກ ສຳເລັດ'})
						})
					}
				})
			},
			startOver() {
				this.inputSeqNo = ''
				this.sticker = null
				this.inputContactNo = ''
				this.inputCustomerName = ''
				this.reason = null
				this.form = null
			}
		}
	}
</script>

<style scoped>
    .button130 {
        width: 130px;
    }
</style>