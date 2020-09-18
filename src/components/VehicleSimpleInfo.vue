<template>
    <div>
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
                    <td>ລຸ້ນ</td>
                    <td>{{vehicleInfo.model}}</td>
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
                    <td>ນ້ຳໜັກ</td>
                    <th>{{vehicleInfo.weight}}</th>
                </tr>
                <tr>
                    <td>ບ່ອນນັ່ງ</td>
                    <th>{{vehicleInfo.seats}}</th>
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
	export default {
		name: 'VehicleSimpleInfo',
		components: {},
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
