<template>
    <div>

        <div class="columns">
            <div class="column">
                <!--
                                <b-field label="ເລືອກແຂວງ" expanded>
                                    <multiselect
                                            placeholder="ແຂວງ ທີ່ພາຫະນະຂຶ້ນທະບຽນ"
                                            v-model="selectedProvince"
                                            label="name"
                                            track-by="provinceid"
                                            :options="getProvinces">
                                    </multiselect>
                                </b-field>-->

                <div class="field">
                    <label class="label">ເລືອກແຂວງ</label>
                    <div class="buttons ">
                        <button class="button" :class="{'is-primary': isProvinceSelected(pv)}"
                                v-for="(pv, index) in getProvinces" :key="pv.provinceid"
                                @click="onProvinceSelected(pv)">{{pv.name}}</button>
                    </div>
                </div>

            </div>
            <div class="column">
                <div class="field">
                    <label class="label">ເລກທະບຽນ</label>
                    <div class="control">
                        <input type="text" class="input" placeholder="ກກ0000" v-model="inputedLicenseNo">
                    </div>
                </div>
                <div class="columns is-multiline" v-if="inputedLicenseNo && selectedProvince">
                    <div class="column" v-if="inputedLicenseNo.substring(0, 3) === 'ປກສ'" @click="onLicenseSelected(0)">
                        <LicencePlate :type_id="0" :license_no="inputedLicenseNo"
                                      :province_id="selectedProvince.provinceid"/>
                    </div>
                    <div class="column" v-if="inputedLicenseNo.substring(0, 2) === 'ກທ'" @click="onLicenseSelected(9)">
                        <LicencePlate :type_id="9" :license_no="inputedLicenseNo"
                                      :province_id="selectedProvince.provinceid"/>
                    </div>
                    <div class="column" v-for="tmp in plateTemplate" @click="onLicenseSelected(tmp)" :key="tmp">
                        <!-- Add content or other tiles -->
                        <LicencePlate :type_id="tmp" :license_no="inputedLicenseNo"
                                      :province_id="selectedProvince.provinceid"/>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="inputedLicenseNo && selectedProvince">
            <h1 class="title is-5 has-text-centered">ຫຼື ເລືອກປະເພດປ້າຍ</h1>
            <div class="field">
                <p class="control">
                    <multiselect
                            placeholder="ປະເພດປ້າຍ"
                            v-model="selectedPlateType"
                            label="name"
                            track-by="platetypeid"
                            :options="getPlateTypes">
                    </multiselect>
                </p>
            </div>
            <div @click="onLicenseSelected(selectedPlateType.platetypeid)">
                <LicencePlate v-if="selectedPlateType" :type_id="selectedPlateType.platetypeid"
                              :license_no="inputedLicenseNo" :province_id="selectedProvince.provinceid"/>
            </div>
        </div>

    </div>
</template>

<script>
	import {get} from 'vuex-pathify'
	import Multiselect from 'vue-multiselect'
	import LicencePlate from "./LicencePlate";
	import BTaglist from "buefy/src/components/tag/Taglist";
	import BTag from "buefy/src/components/tag/Tag";

	export default {
		name: "LicensePlateInputForm",
		components: {BTag, BTaglist, LicencePlate, Multiselect},
		props: {
			active: {
				type: Boolean,
				/*required: true*/
			}
		},
		computed: {
			getProvinces: get('provinces'),
			getPlateTypes: get('vehiclePurposes')
		},
		data() {
			return {
				selectedProvince: null,
				inputedLicenseNo: null,
				plateTemplate: [1, 2, 3, 4, 5, 6],
				selectedPlateType: null
			}
		},
		methods: {
			onLicenseSelected(ptype) {
				//alert(ptype)
				if (this.inputedLicenseNo.length < 6) {
					this.$swal({
						text: 'ກະລຸນາ ປ້ອນເລກທະບຽນໃຫ້ຄົບຖ້ວນ',
						type: 'error'
					})
					return
				}
				this.$emit('on-license-plate-inputed', this.inputedLicenseNo, this.selectedProvince.provinceid, ptype)
			},
			isProvinceSelected(pv) { 
				if (this.selectedProvince === null) return false
				return this.selectedProvince.provinceid === pv.provinceid
			},
			onProvinceSelected(pv) {
				this.selectedProvince = pv
			}
		}
	}
</script>

<style scoped>
    .multiselect__placeholder, .multiselect {
        white-space: nowrap;
    }

    .button {
        width: 150px;
    }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>