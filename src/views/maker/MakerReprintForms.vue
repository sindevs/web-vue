<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ລາຍການຂໍພິມຄືນ</h1>
            <ComDateRangePicker :startdate="startdate" :enddate="enddate" @input-startdate="startdate = $event"
                                @input-enddate="enddate = $event" :button-click="loadPaymentForms"
                                :button-text="'ດຶງລາຍການ'"/>
            <b-table :data="convertedForms" :striped="true"
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
                    <b-table-column field="createdate" label="ວັນທີຊຳລະ">
                        {{ props.row.stickerinfo.payment_date }}
                    </b-table-column>
                    <b-table-column field="createdate" label="ວັນທີຂໍພິມຄືນ">
                        {{ props.row.createdate }}
                    </b-table-column>
                    <b-table-column label="ທະບຽນລົດ">
                        <LicencePlateCompact :license_no="props.row.licenseno" :province_id="props.row.provincecode"
                                             :type_id="props.row.purposeno"/>
                    </b-table-column>
                    <b-table-column field="sn" label="SN">
                        {{ props.row.formbody.sn }}
                    </b-table-column>
                    <b-table-column field="tax_year" label="ສົກປີ">
                        {{ props.row.stickerinfo.tax_year }}
                    </b-table-column>
                    <b-table-column field="tax_amt" label="ຈຳນວນເງິນ">
                        {{ props.row.stickerinfo.tax_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column field="fine_amt" label="ຄ່າປັບໄໝ">
                        {{ props.row.stickerinfo.fine_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column label="ພິມ">
                        <button class="button is-primary" :disabled="props.row.formbody.isprinted !== 0">
                            <font-awesome-icon icon="print"
                                               @click="printSticker(props.row.sn)"></font-awesome-icon>
                        </button>
                    </b-table-column>

                </template>
            </b-table>
        </div>
    </section>
</template>

<script>
	import RestAPI from "../../RestAPI";
	import ComDateRangePicker from "../../components/ComDateRangePicker";
	import LicencePlateCompact from "../../components/LicencePlateCompact";

	export default {
		name: "MakerReprintForms",
		components: {LicencePlateCompact, ComDateRangePicker},
		computed: {
			convertedForms() {
				return this.forms;
			}
		},
		data() {
			return {
				forms: [],
				startdate: new Date(),
				enddate: new Date(),
			}
		},
		methods: {
			loadPaymentForms() {
				const d1 = this.BcelDateFormatter(this.startdate, 'YYYY-MM-DD');
				const d2 = this.BcelDateFormatter(this.enddate, 'YYYY-MM-DD');
				RestAPI.makerReprintReport(d1, d2)
				.then(res => this.forms = res.data)
			},
			printPaymentReceive(formid) {
				console.log('print receive', formid)
			},
			printSticker(sn) {
				console.log('print sticker', sn)
			}
		},
		mounted() {
			this.loadPaymentForms();
		}
	}
</script>

<style scoped>

</style>