<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ລາຍງານ ການແກ້ໄຂ ຂໍ້ມູນພາຫະນະ</h1>
            <div class="no-print">
                <ComDateRangePicker :startdate="startdate" :enddate="enddate" @input-startdate="startdate = $event"
                                    :button-click="getReports" @input-enddate="enddate = $event" isshowprint="true"
                                    :button-text="'ດຶງລາຍງານ'"/>
            </div>

            <b-table :data="reports" :striped="true"
                     :bordered="true">
                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>ບໍ່ມີລາຍການ</p>
                        </div>
                    </section>
                </template>
                <template slot-scope="props">
                    <b-table-column field="formid" :label="getFieldName('formid')" numeric centered>
                        {{ props.row.formid }}
                    </b-table-column>
                    <b-table-column field="checkerdate" :label="getFieldName('checkerdate')">
                        {{ props.row.checkerdate }}
                    </b-table-column>
                    <b-table-column field="formstatus" :label="getFieldName('formstatus')" numeric centered>
                        {{ props.row.formstatus }}
                    </b-table-column>
                    <b-table-column :label="getFieldName('licenseno')" numeric centered>
                        <LicencePlateCompact :license_no="props.row.licenseno" :province_id="props.row.provincecode"
                                             :type_id="props.row.purposeno"/>

                    </b-table-column>
                    <b-table-column field="formstatus" :label="getFieldName('makerid')">
                        {{ props.row.makerid }}
                    </b-table-column>
                    <b-table-column field="createdate" :label="getFieldName('createdate')">
                        {{ props.row.createdate }}
                    </b-table-column>
                    <!-- <b-table-column
                             v-for="(field, index) in reportColumns"
                             :key="index"
                             :field="field.key"
                             :label="getFieldName(field.key)"
                     >
                         {{ props.row[field.key] }}
                     </b-table-column> -->
                </template>

                <template slot="footer" v-if="reports.length > 0">

                    <th colspan="5" class="has-text-right">
                        ລວມ
                    </th>
                    <th>
                        {{reports.length}} ຄັ້ງ
                    </th>


                </template>
            </b-table>
        </div>

    </section>
</template>

<script>
    import RestAPI from "../../RestAPI";
    import ComDateRangePicker from '../../components/ComDateRangePicker'
    import {get} from 'vuex-pathify'
    import LicencePlateCompact from "../../components/LicencePlateCompact";

    export default {
		name: "VehicleEditReport",
		components: {LicencePlateCompact, ComDateRangePicker},
		data() {
			return {
				reports: [],
				startdate: new Date(),
				enddate: new Date(),
				reportColumns: [
					{key: 'formid'},
					{key: 'createdate'},
					{key: 'formstatus'},
					{key: 'formstatus'},

				]
			}
		},
		computed: {
			reportFieldNames: get('glossary@rt3_forms')
		},
		mounted() {
			console.log('vehicle reg report mounted')


		},
		methods: {
			getReports() {
				//console.log(vehicle)
				const d1 = this.BcelDateFormatter(this.startdate, 'YYYY-MM-DD');
				const d2 = this.BcelDateFormatter(this.enddate, 'YYYY-MM-DD');
				RestAPI.makerReportVehicleEdit(d1, d2)
				.then(res => {
					this.reports = res.data;
				}).catch(err => {
					this.$swal({
						text: 'ບໍ່ສາມາດ ດຶງລາຍງານ',
						type: 'error'
					})
				})


			},
			getFieldName(name) {
                console.log('getname', name);
                if (this.reportFieldNames === undefined) return name;
				const field = this.reportFieldNames[name];
                if (field === undefined) return name;
				return field
			}
		}
	}
</script>

<style scoped>

</style>