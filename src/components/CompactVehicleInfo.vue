<template>
    <div>
        <LicencePlate :type_id="vehicleInfo.purpose_no" :license_no="vehicleInfo.license_no"
                      :province_id="vehicleInfo.province_code"/>

        <b-collapse :open="true">
            <div slot="trigger" class="panel-heading">
                <strong>ຂໍ້ມູນ ການຊຳລະ</strong>
            </div>
            <div class="panel-block">
                <table class="table is-striped is-narrow is-fullwidth is-bordered">
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>ວັນທີ</th>
                        <th>ສົກປີ</th>
                        <th>ຈຳນວນ</th>
                        <th>ຄ່າປັບ</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row, index) in vehicleInfo.paymenthistory" :key="index">
                        <td>{{row.seq_no}}</td>
                        <td>{{row.payment_date.substr(0,10)}}</td>
                        <td>{{row.tax_year}}</td>
                        <td>{{row.tax_amt}}</td>
                        <td>{{row.fine_amt}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </b-collapse>

        <b-collapse :open="false">
            <div slot="trigger" class="panel-heading">
                <strong>ຂໍ້ມູນລົດ</strong>
                <span><button class="button is-info is-small" style="margin-left: 5px"
                              @click="showRawData = true">+</button></span>
            </div>
            <div class="panel-block">
                <table class="table is-striped is-narrow is-fullwidth is-bordered">
                    <tbody>
                    <tr>
                        <td>IDX</td>
                        <th>{{vehicleInfo.idx}}</th>
                    </tr>
                    <tr>
                        <td>ເລກຈັກ</td>
                        <td>{{vehicleInfo.engine_no}}</td>
                    </tr>
                    <tr>
                        <td>ເລກຖັງ</td>
                        <td>{{vehicleInfo.chassis_no}}</td>
                    </tr>
                    <tr>
                        <td>ຍີ່ຫໍ້</td>
                        <td>{{vehicleInfo.make}}</td>
                    </tr>
                    <tr>
                        <td>ຄວາມແຮງ</td>
                        <td>{{vehicleInfo.cc}}</td>
                    </tr>
                    <tr>
                        <td>ປະເພດລົດ</td>
                        <th>{{vehicleInfo.vehicletype_id | vehicleTypeName}}</th>
                    </tr>
                    <tr>
                        <td>ການນຳໃຊ້</td>
                        <td>{{vehicleInfo.category_id | vehicleCategoryName}}</td>
                    </tr>
                    <tr>
                        <td>ຄວາມແຮງ ດຶງມາ</td>
                        <td>{{vehicleInfo.original_cc}}</td>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td>{{vehicleInfo.solr_id}}</td>
                    </tr>
                    <tr>
                        <td>ລົງທະບຽນໂດຍ</td>
                        <td>{{vehicleInfo.reg_by}}</td>
                    </tr>
                    <tr>
                        <td>ລຸ້ນ</td>
                        <td>{{vehicleInfo.model}}</td>
                    </tr>
                    <tr>
                        <td>ໝາຍເຫດ</td>
                        <td>{{vehicleInfo.remark}}</td>
                    </tr>
                    <tr>
                        <td>ວັນທີລົງທະບຽນ</td>
                        <td>{{vehicleInfo.register_date}}</td>
                    </tr>
                    <tr>
                        <td>ວັນອອກທະບຽນ</td>
                        <td>{{vehicleInfo.issue_date}}</td>
                    </tr>
                    <tr>
                        <td>ວັນທີ ແກ້ໄຂຂໍ້ມູນ</td>
                        <td>{{vehicleInfo.modify_date}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </b-collapse>
        <b-collapse :open="false">
            <div slot="trigger" class="panel-heading">
                <strong>ປ້າຍທີ່ກ່ຽວຂ້ອງ</strong>
            </div>
            <div class="panel-block">
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
            </div>
        </b-collapse>
        <b-modal :active.sync="showRawData" has-modal-card>
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">ຂໍ້ມູນດິບ</p>
                </header>
                <section class="modal-card-body">

                    <tree-view :data="vehicleInfo"></tree-view>

                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="showRawData = false">Close</button>
                </footer>
            </div>
        </b-modal>
    </div>
</template>
<script>
	import LicencePlate from "./LicencePlate";
	import LicencePlateCompact from "./LicencePlateCompact";

	export default {
		name: 'CompactVehicleInfo',
		components: {LicencePlate, LicencePlateCompact},
		props: {
			vehicleInfo:
			{
				type: Object,
				required: true
			}

		},
		data() {
			return {
				showRawData: false
			}
		},
		computed: {},
		methods: {}
	}
</script>
<style scoped>
    table {
        table-layout: fixed;
    }

    th, td {
        white-space: nowrap;
        overflow: hidden;
    }

    .tree-view-item-key {
        color: red;
    }
</style>
