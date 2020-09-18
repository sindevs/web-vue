<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ລາຍການຍົກເລີກການຊຳລະ</h1>
            <ComDateRangePicker :startdate="startdate" :enddate="enddate" @input-startdate="startdate = $event"
                                @input-enddate="enddate = $event" :button-click="loadPaymentCancelForms"
                                :button-text="'ດຶງລາຍງານ'"/>
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
                    <b-table-column field="createdate" label="ວັນທີຍົກເລີກ">
                        {{ props.row.createdate }}
                    </b-table-column>
                    <b-table-column field="sn" label="SN">
                        {{ props.row.sn }}
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
                    <b-table-column  label="ທະບຽນລົດ">
                        <LicencePlateCompact :license_no="props.row.licenseno" :province_id="props.row.provincecode"
                                             :type_id="props.row.purposeno"/>
                    </b-table-column>
                    <b-table-column field="formstatus" label="ສະຖານະ">
                        <b-tag class="is-primary" v-if="props.row.formstatus === 3">
                        {{ props.row.formstatus | formStatusName }}
                        </b-tag>
                        <b-tag v-else >
                            {{ props.row.formstatus | formStatusName }}
                        </b-tag>
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
		name: "PaymentCancelForms",
		components: {LicencePlateCompact, ComDateRangePicker},
		computed: {
			convertedForms() {
				let forms = this._.map(this.forms, (o, index) => {
					let record = {}
					record.formid = o.formid
					record.createdate = o.createdate
					record.seq = index;
					record.sn = o.formbody.sn
					record.licenseno = o.formbody.stikcerinfo.license_no
					record.provincecode = o.formbody.stikcerinfo.province_code
					record.purposeno = o.formbody.stikcerinfo.purpose_no
					record.tax_year = o.formbody.stikcerinfo.tax_year
					record.tax_amt = o.formbody.stikcerinfo.tax_amt
					record.fine_amt = o.formbody.stikcerinfo.fine_amt
					record.formstatus = o.formstatus
					return record
				})

				return forms
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
			loadPaymentCancelForms() {
				const d1 = this.BcelDateFormatter(this.startdate, 'YYYY-MM-DD');
				const d2 = this.BcelDateFormatter(this.enddate, 'YYYY-MM-DD');
				RestAPI.makerReportCancel(d1, d2)
				.then(res => this.forms = res.data)
			}
		},
		mounted() {
			this.loadPaymentCancelForms();
		}
	}
</script>

<style scoped>

</style>