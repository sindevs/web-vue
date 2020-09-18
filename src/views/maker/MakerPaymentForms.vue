<template>
    <section class="section">
        <div class="container no-print">
            <h1 class="title">ລາຍການຮັບຊຳລະ</h1>
            <ComDateRangePicker :startdate="startdate" :enddate="enddate" @input-startdate="startdate = $event"
                                @input-enddate="enddate = $event" :button-click="loadPaymentForms"
                                :button-text="'ດຶງລາຍງານ'"/>
            <b-table :data="convertedForms" :striped="true"
                     :row-class="onRowClass"
                     :bordered="true">
                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>ບໍ່ມີລາຍການ</p>
                        </div>
                    </section>
                </template>
                <template slot-scope="props">
                    <b-table-column field="sn" label="SN">
                        {{ props.row.sn }}
                    </b-table-column>

                    <b-table-column field="createdate" label="ວັນທີຊຳລະ">
                        {{ props.row.createdate }}
                    </b-table-column>
                    <b-table-column label="ທະບຽນລົດ">
                        <LicencePlateCompact :license_no="props.row.licenseno" :province_id="props.row.provincecode"
                                             :type_id="props.row.purposeno"/>
                    </b-table-column>

                    <b-table-column field="tax_year" label="ສົກປີ">
                        {{ props.row.tax_year }}
                    </b-table-column>
                    <b-table-column field="tax_amt" label="ຈຳນວນເງິນ">
                        {{ props.row.tax_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column field="fine_amt" label="ຄ່າປັບໄໝ">
                        {{ props.row.fine_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column field="formid" label="ເລກທີ" numeric centered>
                        {{ props.row.formid }}
                    </b-table-column>
                    <b-table-column label="ພິມ">
                        <div class="buttons are-small has-text-right">
                            <button class="button is-warning" @click="printPaymentReceive(props.row.formid)"
                                    :disabled="props.row.canceled === 1">
                                <font-awesome-icon icon="book-open"></font-awesome-icon>
                            </button>
                            <button class="button is-primary"
                                    :disabled="props.row.canceled === 1 || props.row.isprinted !== 0">
                                <font-awesome-icon icon="print"
                                                   @click="printSticker(props.row.sn)"></font-awesome-icon>
                            </button>
                        </div>
                    </b-table-column>

                </template>
            </b-table>
        </div>
        <div class="print-only">

            <Receipt :form="printingForm"/>
            <div style="height: 3px; border-bottom: 1px solid black; margin-bottom: 5px"></div>
            <Receipt :form="printingForm"/>
        </div>
    </section>
</template>

<script>
	import RestAPI from "../../RestAPI";
	import ComDateRangePicker from "../../components/ComDateRangePicker";
	import LicencePlateCompact from "../../components/LicencePlateCompact";
	import Receipt from "../../components/Receipt";

	export default {
		name: "MakerPaymentForms",
		components: {Receipt, LicencePlateCompact, ComDateRangePicker},
		computed: {
			convertedForms() {
				let forms = this._.map(this.forms, (rpt) => {
					let requests = this._.map(rpt.formbody.payment_requests, (o, index) => {
						let sn = o.sn;
						let printed = o.isprinted;
						//console.log(sn);
						o = Object.assign(o, rpt)
						o.seq = index;
						o.sn = sn;
						o.isprinted = printed;
						delete o.formbody
					//	console.log('sn', sn);
						return o
					})
					return requests
				}).reduce((o, n) => {
					return o.concat(n)
				}, [])
				return forms
			}
		},
		data() {
			return {
				forms: [],
				startdate: new Date(),
				enddate: new Date(),
				printingForm: null,
				req: null
			}
		},
		methods: {
			onRowClass: function (row, index) {
				//console.log('onRowClass(%d)', index);
				if(row.canceled === 1) return 'iscancled';
				return ''
			},
			loadPaymentForms() {
				const d1 = this.BcelDateFormatter(this.startdate, 'YYYY-MM-DD');
				const d2 = this.BcelDateFormatter(this.enddate, 'YYYY-MM-DD');
				RestAPI.makerReportPayment(d1, d2)
				.then(res => this.forms = res.data)
			},
			printPaymentReceive(formid) {
				//console.log('print receive', formid)
				this.printingForm = this._.find(this.forms, {formid})
				this.$nextTick(() => {
					window.print()
				})


			},
			printSticker(sn) {
				console.log('print sticker', sn)
				/* eslint-disable */
				if (!window.nativeFunction || undefined === window.nativeFunction) {
					this.$swal({
						type: 'error',
						title: 'ກະລຸນາພິມຜ່ານໂປຣແກຣມສະເພາະ'
					});
					return;
				}
				/* eslint-enable */
				RestAPI.getSticker(sn).then(res => {
					const sticker = res.data;
					const {tax_cat, province, vehicletype, vehicletype_id, category_id, license_no, tax_year, payment_date, seq_no, chassis_no, print_amt, cc, seats, weight, print_count, purpose_no} = sticker
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
						formid: sticker.batch_id
					}
					return nativeFunction.printsticker(printcmd)
					/* eslint-enable */
				})
				.then(res => {
					console.log('printed', res)
					if (res !== 1) {
						return Promise.reject('Print failed')
					}
					return RestAPI.receivePrinted(this.req)
				}).then(res => {
					console.log('update pritned', res.data)
				})
				.catch(e => {
					console.log(e)
					this.$swal({
						type: 'error',
						text: 'ບໍ່ສາມາດພິມໄດ້, ກະລຸນາກວດເຄື່ອງພິມ #2'
					})
				})
				.catch(err => {
					this.$swal({
						type: 'error',
						title: 'ບໍ່ສາມາດ ດຶງຂໍ້ມູນ Sticker'
					});
					console.log('error', err)
				})
			}
		},
		mounted() {
			this.loadPaymentForms();
		}
	}
</script>

<style scoped>
    .iscancled > td {
        text-decoration: line-through;
    }
</style>