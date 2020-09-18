<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ຍົກເລີກການຊຳລະ</h1>
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
                            <b-select v-model="reason" placeholder="ເຫດຜົນການຍົກເລີກ">
                                <option value="1">
                                    ພິມບໍ່ອອກ
                                </option>
                                <option value="3">
                                    ລູກຄ້າຊຳລະຜິດ
                                </option>
                                <option value="4">
                                    ພະນັກງານ ຊຳລະຜິດ
                                </option>
                                <option value="3">
                                    ອຶ່ນໆ
                                </option>
                            </b-select>
                            <div class="control">
                                <button class="button is-info button130" :disabled="!isCancelable || !reason" @click="saveCancel">
                                    ບັນທຶກ
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
	import RestAPI from "../../RestAPI";
	import LicencePlate from "../../components/LicencePlate";
	import StickerInfo from "../../components/StickerInfo";
	import moment from 'moment'
	import {get} from 'vuex-pathify'

	export default {
		name: "CancelPayment",
		components: {StickerInfo, LicencePlate},
		computed: {
			userid: get('session@userid'),
			paymentdate() {
				return new moment(this.sticker.payment_date)
			},
			isCancelable() {
				if (!this.paymentdate.isValid()) return false
				if (this.sticker.settled == 1) return false
				if (!this.paymentdate.isSame(moment(), 'day')) return false
				if (this.sticker.user_id != this.userid) return false
				return true
			}
		},
		data() {
			return {
				inputSeqNo: '',
				sticker: null,
				reason: null
			}
		},
		methods: {
			getSticker() {
				RestAPI.getSticker(this.inputSeqNo)
				.then(res => {
					this.sticker = res.data
					if (this.isCancelable == false) {
						this.$swal({
							text: 'ບໍ່ສາມາດ ຍົກເລີກໄດ້',
							type: 'error'
						})
					}
				})
				.catch(err => {
					console.log(err)
					this.$swal({text: 'ບໍ່ສາມາດ ດຶງຂໍ້ມູນ', type: 'error'})
				})
			},
			saveCancel() {
				if (this.sticker === null) return
				if (this.sticker.isCancelable === false) return
				this.$swal({
					type: 'question',
					text: 'ທ່ານຕ້ອງການ ຍົກເລີກລາຍການແທ້ບໍ່?'
				}).then(res => {
					if (res.value) {
						const req = {
							sn: this.sticker.seq_no,
							reason: this.reason
						}
						RestAPI.cancelPayment(req)
						.then(res => {
							return this.$swal({
								type: 'success',
								text: 'ບັນທຶກ ສຳເລັດ, ເລກທີລາຍການ ' + res.data.formid + ', ກະລຸນາ ແຈ້ງຜູ້ອະນຸມັດ ເພື່ອຢືນຢັນລາຍການ'
							})

						})
                        .then(res => {
                        	this.sticker = null;
                        	this.reason = null;
                        })
						.catch(ex => {
							this.$swal({
								type: 'error',
								text: 'ຜິດພາດ ' + JSON.stringify(ex.response.data)
							})
						})
					}
				})
			}
		}
	}
</script>

<style scoped>

</style>