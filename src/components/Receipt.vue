<template>
    <div v-if="form" class="receive">
        <div class="columns">
            <div class="column">
                <table class="table is-fullwidth">
                    <tr>
                        <td style="width: 100px; vertical-align: middle" class="has-text-centered">
                            <img :src="require(`@/assets/${user.agentid}.png`)" width="50" height="50">
                        </td>
                        <td>
                            <p>{{user.agentid | agentName}}</p>
                            <p>
                                <strong>{{user.branchid}} - {{user.branchid | branchname}}</strong>
                            </p>
                            <p v-if="user.branchid !== user.unitid">
                                <strong>{{user.unitid}} - {{user.unitid | unitname}}</strong>
                            </p>
                        </td>
                        <td>
                            <p class="has-text-right">
                                ເລກທີ.
                                <strong>{{form.formid}}</strong>
                            </p>
                            <p class="has-text-right">
                                ວັນທີ:
                                <strong>{{form.createdate}}</strong>
                            </p>
                            <p class="has-text-right">
                                <strong>{{user.userid}}-{{user.fullname}}</strong>
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <h1 class="title has-text-centered is-5">ໃບຮັບຊໍາລະຄ່າທຳນຽມທາງ</h1>
        <div class="columns">
            <div class="column">
                <table class="table is-fullwidth">
                    <thead>
                    <tr>
                        <th colspan="2">
                            <h1 class="title is-6 has-text-centered">
                                <u>ຂໍ້ມູນພາຫະນະ</u>
                            </h1>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="has-text-right">ທະບຽນລົດ</td>
                        <th colspan="3">
                            <LicencePlateCompact
                                    :license_no="form.licenseno"
                                    :type_id="form.purposeno"
                                    :province_id="form.provincecode"
                            />
                        </th>
                    </tr>

                    <tr>
                        <td class="has-text-right">ປະເພດລົດ</td>
                        <th>{{form.formbody.vehicleInfo.vehicletype}}</th>
                        <td class="has-text-right">ຈຸດປະສົງນໍາໃຊ້</td>
                        <th>{{form.formbody.vehicleInfo.category_id | vehicleCategoryName}}</th>
                    </tr>
                    <tr>
                        <td class="has-text-right">ຍີ່ຫໍ້/ລຸ້ນ</td>
                        <th>{{form.formbody.vehicleInfo.make}} {{form.formbody.vehicleInfo.model}}</th>
                        <td class="has-text-right">ຄວາມແຮງ</td>
                        <th>{{form.formbody.vehicleInfo.cc | formatNumberLocal}} cc</th>
                    </tr>
                    <tr>
                        <td class="has-text-right">ເລກຈັກ</td>
                        <th colspan="3">{{form.formbody.vehicleInfo.engine_no}}</th>
                    </tr>
                    <tr>
                        <td class="has-text-right">ເລກຖັງ</td>
                        <th colspan="3">{{form.formbody.vehicleInfo.chassis_no}}</th>
                    </tr>
                    <tr v-if="form.formbody.vehicleInfo.category_id === 3">
                        <td class="has-text-right">ນ້ຳໜັກບັນທຸກ</td>
                        <th>{{form.formbody.vehicleInfo.weight}}</th>
                    </tr>
                    <tr v-if="form.formbody.vehicleInfo.category_id === 2">
                        <td class="has-text-right">ບ່ອນນັ່ງ</td>
                        <th>{{form.formbody.vehicleInfo.seats}}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="column">
                <table class="table is-fullwidth">
                    <thead>
                    <tr>
                        <th colspan="2">
                            <h1 class="title is-6 has-text-centered">
                                <u>ຂໍ້ມູນການຊຳລະ</u>
                            </h1>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colspan="2">ວັນທີຊຳລະ : <strong>{{form.createdate}}</strong></td>
                    </tr>
                    <tr v-if="user.agentid === 'BCEL'">
                        <td colspan="2">ວິທີການຊຳລະ {{extractPaymentBody('payment_type').join(', ')}}
                            <span v-if="user.agentid === 'BCEL' && extractPaymentBody('payment_type')[0] === 'acc'">/{{extractPaymentBody('payment_acc').join(', ')}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>ປີທີ່ຊຳລະ <strong>{{extractPaymentBody('tax_year').join(', ')}}</strong></td>
                        <td>ຜູ້ຊໍາລະ <strong>{{extractPaymentBody('customer_name')[0]}}</strong></td>
                    </tr>
                    <tr>
                        <td colspan="2">ລວມຄ່າທຳນຽມທາງ : <strong>{{extractPaymentBody('tax_amt').reduce((sum,
                            n) => sum + n, 0) | formatNumberLocal}} </strong>
                            ລວມຄ່າປັບໄໝ: <strong> {{extractPaymentBody('fine_amt').reduce((sum, n) => sum + n, 0) |
                                formatNumberLocal}} </strong>
                        </td>
                    </tr>
                    <tr>
                        <td class="">ລວມເງິນທີ່ຕ້ອງຊຳລະ: <strong>
                            {{extractPaymentBody('tax_amt').reduce((sum, n) => sum + n, 0) +
                            extractPaymentBody('fine_amt').reduce((sum, n) => sum + n, 0) | formatNumberLocal}}
                            ({{extractPaymentBody('tax_amt').reduce((sum, n) => sum + n, 0) +
                            extractPaymentBody('fine_amt').reduce((sum, n) => sum + n, 0) | laoNumberString}} ກີບ)
                        </strong>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <div style="margin-bottom: 20px" class="has-text-centered">
            <strong>ຂ້າພະເຈົ້າ ຜູ້ຊຳລະ, ໄດ້ກວດສອບຂໍ້ມູນຂ້າງເທິງ ຖືກຕ້ອງຕາມຕົວຈິງແລ້ວ.</strong>
        </div>
        <div class="columns" style="height: 100px">
            <div class="column ">
                <p class="has-text-centered"><strong>ຜູ້ອະນຸມັດ</strong></p>
            </div>
            <div class="column">
                <p class="has-text-centered"><strong>ພະນັກງານ/ຜູ້ຮັບຊຳລະ</strong></p>
            </div>
            <div class="column">
                <p class="has-text-centered"><strong>ຜູ້ຊຳລະ</strong></p>
            </div>
        </div>
    </div>
</template>

<script>
	import {get} from "vuex-pathify";
	import LicencePlateCompact from "./LicencePlateCompact";

	export default {
		components: {LicencePlateCompact},
		props: {
			form: {
				type: Object
			}
		},
		computed: {
			user: get("session")
		},
		methods: {
			extractPaymentBody(key) {
				if (!this.form) return [];
				let t = this.form.formbody.payment_requests.reduce((o, n) => {
					return o.concat(n[key]);
				}, []);
				return t;
			}
		}
	};
</script>

<style scoped>
    @media print {
        .receive {
            font-size: 0.8em
        }

        th, td , tr{
            white-space: nowrap;
            border: none !important;
        }
    }
</style>
