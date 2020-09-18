<template>
    <div class="license-plate-container">
        <b-taglist>
            <b-tag class="is-light">{{ getProvince.name }}</b-tag>
            <b-tag class="is-light">
                {{license_no.replace(/^([ກ-ຮ]+)(.*)$/gi, '$1')}} {{ license_no.substr(2) }}
            </b-tag>
            <b-tag class="is-warning">
                {{getPlate.name}}
            </b-tag>
        </b-taglist>
    </div>
</template>
<script>
	import {get} from 'vuex-pathify'
	import BTag from "buefy/src/components/tag/Tag";
	import BTaglist from "buefy/src/components/tag/Taglist";

	export default {
		name: 'LicencePlateCompact',
		components: {BTaglist, BTag},
		props: {
			province_id:
			{
				type: Number,
				required: true
			}
			,
			license_no: {
				type: String,
				required: true
			},
			type_id: {
				type: Number,
				required: true
			}
		},
		computed: {
			provinces: get('provinces'),
			purposeTypes: get('vehiclePurposes'),
			fmt_licence_no() {
				return this.license_no.replace(/^([ກ-ຮ]+)(.*)$/gi, '$1 $2')
			},
			getPlate() {
				let inputCode = this.type_id
				let plate = this._.find(this.purposeTypes, (o) => {
					return o.platetypeid === inputCode
				})
				return plate
			},
			getProvince() {
				let inputCode = this.province_id
				let pro = this._.find(this.provinces, (o) => {
					return o.provinceid === inputCode
				})
				return pro
			}
		}
	}
</script>
<style scoped>
    .vlicense {
        border: 2px solid;
        width: 150px !important;
        margin: 0 auto;
        font-weight: bold;
        border-radius: 5px;
        margin-top: 1em;
        white-space: nowrap;
    }

    .vlicense tbody {
        cursor: pointer;
    }

    .vlicense tbody:hover {
        cursor: pointer;
    }

    .vlicense-army, .vlicense-police {
        border-color: #FFFFFF;
        background-color: #d50703;
    }

    .vlicense-army td, .vlicense-police td {
        color: #FFFFFF;
        background-color: #d50703;
        border-radius: 2px;
    }

    .vlicense-goverment {
        border-color: #2222FF;
        background-color: #FFFFFF;
    }

    .vlicense-goverment td {
        color: #FFFFFF;
        background-color: #2222FF;
        border-radius: 2px;
    }

    .vlicense-foreigner {
        border-color: #10a2ff;
        background-color: #FCBA0B;
    }

    .vlicense-foreigner td {
        background-color: #FCBA0B;
        color: #10a2ff;
        border-radius: 2px;
    }

    .vlicense-company100 {
        border-color: #000000;
        background-color: #FFFFFF;
        color: #000000;
    }

    .vlicense-company1 {
        border-color: #10a2ff;
        background-color: #FFFFFF;
        color: #10a2ff;
    }

    .vlicense-private {
        border-color: #000000;
        background-color: #FCBA0B;
        border-radius: 2px;
    }

    .print-only {
        display: none;
    }

    @media print {
        .print-only {
            display: inline-block;
        }

        .no-print {
            display: none !important;
        }
    }
</style>
