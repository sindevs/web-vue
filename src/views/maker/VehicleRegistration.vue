<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ລົງທະບຽນ ພາຫະນະ</h1>
            <VehicleForm @on-save-vehicle="saveVehicle"/>
        </div>

    </section>
</template>

<script>
	import VehicleForm from "../../components/VehicleForm";
	import RestAPI from "../../RestAPI";

	export default {
		name: "VehicleRegistration",
		components: {VehicleForm},
		data() {
			return {
				//vehicle: JSON.parse('{"license_no":"\u0eae\u0ea19339","province":"\u0e81\u0ecd\u0eb2\u0ec1\u0e9e\u0e87\u0e99\u0eb0\u0e84\u0ead\u0e99","province_code":1,"purpose":"\u0ec0\u0ead\u0e81\u0eb0\u0e8a\u0ebb\u0e99","purpose_no":1,"owner_name":"bounkhong","cc":"","vehicletype":"\u0ea5\u0ebb\u0e94\u0ec0\u0e81\u0eb1\u0e87","make":"kia","model":"cerato","seats":0,"engine_no":"1234","chassis_no":"567hjgt5","register_date":"2018-08-01","is_active":1,"issue_date":"2018-08-01","expire_date":"01\\/08\\/2018","create_date":"2018-08-01","village":null,"district":null,"idx":1006,"data_flag":1,"reg_by":"ADVIN","weight":0,"category_id":1,"vehicletype_id":2,"solr_id":null,"solr_position":null,"original_cc":null,"modify_date":"2018-08-01","remark":"","log":null,"canceled":null,"old_issue_date":"01\\/08\\/2018","payabletax":[],"paymenthistory":[{"seq_no":36,"sticker_date":"2018-08-02 11:58:13","user_id":"SUPER01","tax_amt":150000,"tax_cat":"202","license_no":"\u0eae\u0ea19339","province_code":1,"province":"\u0e81\u0ecd\u0eb2\u0ec1\u0e9e\u0e87\u0e99\u0eb0\u0e84\u0ead\u0e99","purpose_no":1,"tax_year":"2018","engine_no":"1234","chassis_no":"567hjgt5","cc":1600,"vehicletype":"\u0ea5\u0ebb\u0e94\u0ec0\u0e81\u0eb1\u0e87","vehicle_idx":1006,"is_printed":0,"print_date":null,"print_user":null,"payment_type":"cash","payment_acc":null,"payment_receipt":null,"print_count":0,"branch_id":"001","payment_date":"2018-08-02 06:58:13","narative":"\u0e97\u0ec9\u0eb2\u0ea7 \u0e9a\u0eb8\u0e99\u0e84\u0ead\u0e87 \u0e97\u0eb2\u0e99\u0eb0\u0ea7\u0eb1\u0e99 020 599224499","is_sync":0,"vehicletype_id":2,"seats":0,"weight":0,"settled":0,"settle_ref":null,"payment_channel":"APB","deleted":0,"delete_by":null,"print_amt":150000,"remark":null,"is_cancled":0,"batch_id":null,"barcode":null,"bcome_payment_ref":null,"bcome_print_ref":null,"bcome_settle_print_ref":null,"bcome_settle_payment_ref":null,"seq":36,"fine_amt":4950,"fine_note":"\u0e9b\u0eb1\u0e9a 33 \u0ea1\u0eb7\u0ec9","fine_fccref1":null,"fine_fccref2":null}]}')
			}
		},
		mounted() {
			console.log('vehicle reg mounted')
			//this.vehicle =
		},
		methods: {
			saveVehicle(vehicle) {
				//console.log(vehicle)

				RestAPI.vehicleRegistration(vehicle)
				.then(res => {
					this.$swal({
						text: 'ລົງທະບຽນສຳເລັດ',
						type: 'success'
					}).then(() => {
						//location.reload()
                        this.$router.go();
					})
				}).catch(err => {
                        var msg = "ມີຂໍ້ຜິດພາດ";
                        if(err.response) {
                        	msg = err.response.data
                        }
					this.$swal({
						text: msg,
						type: 'error'
					})
				})


			}
		}
	}
</script>

<style scoped>

</style>