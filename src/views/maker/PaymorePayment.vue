<template>
    <section class="section">
        <div class="container no-print">
            <h1 class="title">ຮັບຊຳລະ ຄ່າທຳນຽມທາງ (ຈ່າຍເພີ່ມເຕີມ)</h1>
            <LicensePlateInputForm v-if="showInputLicense" @on-license-plate-inputed="onLincensePlateInputed"/>
            <div v-if="vehicleInfo">
                <LicencePlate :type_id="vehicleInfo.purpose_no" :license_no="vehicleInfo.license_no"
                              :province_id="vehicleInfo.province_code" @click.native="clearPaymentForm"/>
            </div>
            <div class="columns" v-if="vehicleInfo">
                <div class="column ">
                    <div class="box">

                        <div class="columns" v-if="user.agentid === 'BCEL'">
                            <div class="column">
                                <b-field label="ຊຳລະດ້ວຍ" expanded>
                                    <b-select placeholder="ເລືອກ" expanded v-model="inputPaymentType"
                                              name="inputPaymentType" v-validate="'required'">
                                        <option value="cash">
                                            ເງິນສົດ
                                        </option>
                                        <option value="acc">
                                            ຕັດບັນຊີ
                                        </option>
                                    </b-select>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="ເລກບັນຊີ" expanded>
                                    <b-field>
                                        <b-input placeholder="ເລກບັນຊີ" expanded :disabled="inputPaymentType!=='acc'">
                                        </b-input>
                                        <p class="control">
                                            <button class="button is-primary"
                                                    :disabled="inputPaymentType!=='acc' && inputAccountNo.length < 5"
                                                    @click="onCheckSignatureClicked">ກວດລາຍເຊັນ
                                            </button>
                                        </p>
                                    </b-field>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <b-field label="ຊື່ຜູ້ຊຳລະ" expanded
                                         :type="{'is-danger': errors.has('inputCustomerName'), 'is-success': !errors.has('inputCustomerName') && fieldTouched('inputCustomerName')}"
                                         :message="errors.first('inputCustomerName')">
                                    <b-input expanded v-model="inputCustomerName" name="inputCustomerName"
                                             v-validate="'required'"></b-input>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="ເບີໂທ" expanded
                                         :type="{'is-danger': errors.has('inputContactNumber'), 'is-success': !errors.has('inputContactNumber') && fieldTouched('inputContactNumber')}"
                                         :message="errors.first('inputContactNumber')">
                                    <b-input expanded v-model="inputContactNumber" name="inputContactNumber"
                                             v-validate="'required|numeric'"></b-input>
                                </b-field>
                            </div>
                        </div>
                        <b-field label="ອັດຕາຄ່າທຳນຽມ">
                            <b-input :value="vehicleInfo.estimate_tax.amt | formatNumberLocal" expanded
                                     disabled></b-input>
                        </b-field>
                        <b-field label="ລາຍການທີ່ຕ້ອງການຈ່າຍເພີ່ມ">
                            <table class="table is-fullwidth" v-if="vehicleInfo.paymenthistory.length > 0">
                                <thead>
                                <tr>
                                    <th>ປີ</th>
                                    <th>SN</th>
                                    <th>ຄ່າທຳນຽມທີ່ຈ່າຍແລ້ວ</th>
                                    <th>ຈຳນວນທີ່ຕ້ອງຈ່າຍເພີ່ມ</th>
                                    <th>ເລືອກ?</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(row, index) in vehicleInfo.paymenthistory" :key="row.seq_no"
                                    :class="{'is-selected': isSelected(row)}"
                                    @click="onTaxClicked(index)">
                                    <td>{{row.tax_year}}</td>
                                    <td>{{row.seq_no}}</td>
                                    <td>{{row.tax_amt | formatNumberLocal}}</td>
                                    <td>{{ vehicleInfo.estimate_tax.amt - row.tax_amt | formatNumberLocal}}</td>
                                    <td width="150">{{isSelected(row) ?'ເລືອກ': '-'}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="box" v-else>
                                ບໍ່ມີລາຍການທີ່ເຄີຍຊຳລະ
                            </div>
                        </b-field>
                        <b-field label="ປີທີ່ເລືອກ">
                            <b-input :value="_.map(selectedTaxItems,(o) => {return o.tax_year}).join(',')" expanded
                                     disabled></b-input>
                        </b-field>
                        <b-field label="ຈຳນວນທີ່ຕ້ອງຈ່າຍເພີ່ມ">
                            <b-input
                                    :value="selectedTaxItems.length == 0 ? 0: vehicleInfo.estimate_tax.amt - selectedTaxItems[0].tax_amt | formatNumberLocal"
                                    expanded
                                    disabled></b-input>
                        </b-field>
                        <b-field>
                            <div class="columns">
                                <div class="column">
                                    <button class="button is-fullwidth is-success" @click="onSaveClicked"
                                            :disabled="form">ບັນທຶກ
                                    </button>
                                </div>
                                <div class="column">
                                    <button class="button is-fullwidth is-info" :disabled="!form" @click="printReceive">
                                        ພິບໃບຮັບຊຳລະ
                                    </button>
                                </div>
                                <div class="column">
                                    <button class="button is-fullwidth is-danger" :disabled="!stickers || allPrinted"
                                            @click="printSticker">ພິມສະຕິກເກີ້
                                    </button>
                                </div>
                                <div class="column">
                                    <button class="button is-fullwidth is-default" @click="clearPaymentForm">ເລີ່ມໃໝ່
                                    </button>
                                </div>
                            </div>

                        </b-field>


                    </div>
                </div>
                <div class="column ">
                    <div class="box">

                        <b-tabs v-model="activeInfoTab">
                            <b-tab-item label="ຂໍ້ມູນລົດ">
                                <VehicleSimpleInfo :vehicle-info="vehicleInfo"/>
                            </b-tab-item>
                            <b-tab-item label="ປະຫວັດ ການຊຳລະ">
                                <table class="table is-fullwidth is-bordered is-narrow">
                                    <thead>
                                    <tr>
                                        <th>ປີ</th>
                                        <th>ຄ່າທຳນຽມ</th>
                                        <th>ຄ່າປັບໄໝ</th>
                                        <th>ຈ່າຍຜ່ານ</th> 
                                        <th>ວັນທີ</th>
                                        <th>SN</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(row, index) in vehicleInfo.paymenthistory" :key="index">
                                        <td>{{row.tax_year}}</td>
                                        <td>{{row.tax_amt | formatNumberLocal}}</td>
                                        <td>{{row.fine_amt | formatNumberLocal}}</td>
                                        <td>
                                            <b-taglist>
                                                <b-tag>{{row.payment_channel}}</b-tag>
                                                <b-tag> {{row.agentid}}</b-tag>
                                            </b-taglist>
                                        </td>
                                        <td>{{row.payment_date}}</td>
                                        <td>{{row.seq_no}}</td>
                                        <td>
                                            <button class="button is-small"
                                                    @click="selectedHistory = row; showRawData = true"><span
                                                    class="icon">&#x1F50D;</span>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </b-tab-item>
                            <b-tab-item label="ປ້າຍທີ່ອາດກ່ຽວຂ້ອງ">
                                <table class="table is-bordered is-hovered is-narrow is-fullwidth">
                                    <thead>
                                    <tr>
                                        <th>ປ້າຍ</th>
                                        <th>ວັນທີ ອອກທະບຽນ</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="row in vehicleInfo.relatevehicles" :key="row.idx">
                                        <td>
                                            <LicencePlate :license_no="row.license_no" :province_id="row.province_code"
                                                          :type_id="row.purpose_no"/>
                                        </td>
                                        <td>{{row.issue_date}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </b-tab-item>

                        </b-tabs>

                    </div>

                </div>
            </div>
        </div>

        <div class="print-only">
            <Receipt :form="form"/>
            <div style="height: 3px; border-bottom: 1px solid black; margin-bottom: 5px"></div>
            <Receipt :form="form"/>
        </div>

        <b-modal :active.sync="showVehicleSelection" :canCancel="true" :width="960" scroll="keep">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title"> ເລືອກພາຫະນະ ທີ່ຕ້ອງການຊຳລະ</p>
                </header>
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
        <b-modal :active.sync="showRawData" has-modal-card width="960">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">ຂໍ້ມູນດິບ</p>
                </header>
                <section class="modal-card-body">

                    <tree-view :data="selectedHistory"></tree-view>

                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="showRawData = false">Close</button>
                </footer>
            </div>
        </b-modal>
    </section>
</template>

<script>
	import LicensePlateInputForm from "../../components/LicensePlateInputForm";
	import RestAPI from "../../RestAPI";
	import LicencePlate from "../../components/LicencePlate";
	import BTaglist from "buefy/src/components/tag/Taglist";
	import BField from "buefy/src/components/field/Field";
	import VehicleSimpleInfo from "../../components/VehicleSimpleInfo";
	import BTabItem from "buefy/src/components/tabs/TabItem";
	import LicencePlateCompact from "../../components/LicencePlateCompact";
	import {get} from 'vuex-pathify';
	import Receipt from "../../components/Receipt";

	export default {
		name: "PaymorePayment",
		components: {
			Receipt,
			BTabItem, VehicleSimpleInfo, BField, BTaglist, LicencePlate, LicensePlateInputForm, LicencePlateCompact
		},
		computed: {
			user: get('session')
		},
		data() {
			return {
				showInputLicense: true,
				showVehicleSelection: false,
				vehicleInfos: [],
				vehicleInfo: null,
				activeInfoTab: 0,
				selectedTaxItems: [],
				showRawData: false,
				selectedHistory: null,
				inputPaymentType: 'cash',
				inputAccountNo: '',
				inputCustomerName: '',
				inputContactNumber: '',
				form: null,
				stickers: null,
				allPrinted: false
			}
		},
		methods: {
			printReceive() {
				window.print();
			},
			async printSticker() {
				/* eslint-disable */
				if (!window.nativeFunction || undefined === window.nativeFunction) {
					this.$swal({
						type: 'error',
						title: 'ກະລຸນາພິມຜ່ານໂປຣແກຣມສະເພາະ'
					});
					return;
				}
				/* eslint-enable */
				for (let i = 0; i < this.stickers.length; i++) {
					const {tax_cat, province, vehicletype, vehicletype_id, category_id, license_no, tax_year, payment_date, seq_no, chassis_no, print_amt, cc, seats, weight, print_count, purpose_no} = this.stickers[i]
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
					let res = nativeFunction.printsticker(printcmd)
					/* eslint-enable */
					if (res !== 1) {
						this.$swal({
							type: 'error',
							text: 'ບໍ່ສາມາດພິມໄດ້, ກະລຸນາກວດເຄື່ອງພິມ'
						})
						break;
					}
					const req = {
						sn: seq_no,
						formid: this.form.formid
					}
					try {
						const updateremote = await RestAPI.receivePrinted(req)
						console.log('receivePrinted', updateremote)
					} catch (e) {
						console.log('remote update printed error', e);
					}
				}
				this.allPrinted = true


			},
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
					this.vehicleInfos = res.data
					if (this.vehicleInfos.length == 1) {
						this.vehicleInfo = this.vehicleInfos[0]
						this.showPaymentForm()
					} else {
						this.showVehicleSelection = true
					}
					//this.showVehicleSelection = true
				})
			},
			vehicleDidSelected(index) {
				this.showVehicleSelection = false
				this.vehicleInfo = this.vehicleInfos[index]
				this.showPaymentForm()
			},
			showPaymentForm() {
				this.showInputLicense = false
			},
			clearPaymentForm() {
				this.vehicleInfos = []
				this.vehicleInfo = null
				this.showInputLicense = true
				this.showVehicleSelection = false
				this.selectedTaxItems = []
				this.form = null,
				this.stickers = null
			},
			onTaxClicked(index) {
				//alert(index)
				const selected = this.vehicleInfo.paymenthistory[index];
				this.selectedTaxItems = [selected];
			},
			isSelected(search) {
				const exist = this._.find(this.selectedTaxItems, (o) => {
					return o.seq_no === search.seq_no
				})
				return exist !== undefined
			},
			onCheckSignatureClicked() {
				alert('signature');
			},
			async onSaveClicked() {
				this.errors.remove('seletedTaxItems');
				console.log('selected', this.selectedTaxItems.length)
				if (this.selectedTaxItems.length === 0) {
					this.errors.add({
						field: 'seletedTaxItems',
						msg: 'required'
					})
				}
				this.errors.remove('inputAccountNo');
				if (this.user.agentid !== 'BCEL') {
					this.inputPaymentType = 'acc'
					this.inputAccountNo = 'AGENTACC'
				}
				console.log('agentid', this.user.agentid);
				if (this.inputPaymentType === 'acc' && this.user.agentid === 'BCEL' && this.inputAccountNo.length === 0) {
					this.errors.add({
						field: 'inputAccountNo',
						msg: 'required'
					})
				}

				let valid = await this.$validator.validate();
				if (!valid || this.errors.any()) {
					this.$swal({
						type: 'error',
						text: 'ກະລຸນາ ປ້ອນຂໍ້ມູນ ໃຫ້ຄົບ ແລະ ເລືອກປີທີ່ຕ້ອງການຊຳລະ'
					})
					return
				}

				let req = {
					idx: this.vehicleInfo.idx,
					payment_requests: this.selectedTaxItems.map(item => {
						return {
							idx: this.vehicleInfo.idx,
							tax_year: item.tax_year,
							tax_amt: this.vehicleInfo.estimate_tax.amt - item.tax_amt,
							fine_amt: 0,
							fine_note: '',
							real_amt: this.vehicleInfo.estimate_tax.amt,
							customer_name: this.inputCustomerName,
							contact_number: this.inputContactNumber,
							payment_type: this.inputPaymentType,
							payment_acc: this.inputAccountNo,
							channel: 'COUNTER',
							tax_cat: this.vehicleInfo.estimate_tax.cat
						}
					})
				}

				console.log('payment request', req);

				RestAPI.makerMakePaymorePayment(req).then(res => {
					//console.log(res.data)
					this.form = res.data.form
					if (res.data.stickers !== undefined) {
						this.stickers = res.data.stickers
					}
					this.$swal({type: 'success', text: 'ການບັນທຶກ ສຳເລັດ'})
				})
				.catch(error => {
					if (error.response === undefined) {
						this.$swal({type: 'error', text: 'ບໍ່ສາມາດ ເຊື່ອມຕໍ່ກັບລະບົບໄດ້'})
						return
					}

					this.$swal({type: 'error', text: 'ມີຂໍ້ຜິດພາດ'})
				})

			}
		}
	}
</script>

<style scoped>
    tr.is-selected {

    }
</style>