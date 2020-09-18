<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ສະຫຼຸບເງິນສົດ</h1>
                <b-field position="is-centered">
                    <div class="control">
                        <span class="button">
                            ກະລຸນາມອບເງິນສົດ ຈຳນວນ&nbsp;<b>{{_.sumBy(reports, (o) => {return o.tax_amt + o.fine_amt}) | formatNumberLocal}}</b>&nbsp;ເຂົ້າບັນຊີ
                        </span>
                    </div>
                    <div class="control">
                        <span class="button is-warning">010.00.0000000</span>
                    </div>
                    <b-input v-model.trim="billnumber" expanded placeholder="FJB0000000000000"/>
                    <div class="control">
                        <button class="button is-info" :disabled="billnumber.trim().length == 0">ຢຶນຢັນການມອບເງິນ</button>
                    </div>
                </b-field>
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
                    <b-table-column field="batch_id" :label="getFieldName('batch_id')" numeric centered>
                        {{ props.row.batch_id }}
                    </b-table-column>
                    <b-table-column field="payment_date" :label="getFieldName('payment_date')">
                        {{ props.row.payment_date }}
                    </b-table-column>
                    <b-table-column field="seq_no" :label="getFieldName('seq_no')" numeric centered>
                        {{ props.row.seq_no }}
                    </b-table-column>
                    <b-table-column :label="getFieldName('license_no')">
                        <LicencePlateCompact :license_no="props.row.license_no" :province_id="props.row.province_code"
                                             :type_id="props.row.purpose_no"/>

                    </b-table-column>

                    <b-table-column field="tax_year" :label="getFieldName('tax_year')">
                        {{ props.row.tax_year }}
                    </b-table-column>
                    <b-table-column field="tax_amt" :label="getFieldName('tax_amt')" numeric centered>
                        {{ props.row.tax_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column field="fine_amt" :label="getFieldName('fine_amt')" numeric centered>
                        {{ props.row.fine_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column :label="getFieldName('total_amt')" numeric centered>
                        {{ props.row.fine_amt + props.row.tax_amt | formatNumberLocal }}
                    </b-table-column>

                </template>

                <template slot="footer" v-if="reports.length > 0">

                    <th colspan="6" class="has-text-right">
                        ລວມ
                    </th>

                    <th>
                        {{reports.length}} ລາຍການ
                    </th>
                    <th class="has-text-right">
                        {{_.sumBy(reports, (o) => {return o.tax_amt + o.fine_amt}) | formatNumberLocal}} ກີບ
                    </th>


                </template>
            </b-table>
        </div>

    </section>
</template>

<script>
    import RestAPI from "../../RestAPI";
    import {get} from 'vuex-pathify'
    import LicencePlateCompact from "../../components/LicencePlateCompact";
    import BField from "buefy/src/components/field/Field";
    import BInput from "buefy/src/components/input/Input";

    export default {
        name: "UnsettleReport",
        components: {BInput, BField, LicencePlateCompact},
        data() {
            return {
                reports: [],
                billnumber: ''
            }
        },
        computed: {
            reportFieldNames: get('glossary@rt3_forms'),

        },
        mounted() {
            console.log('vehicle reg report mounted')
            this.getReports()

        },
        methods: {
            getReports() {

                RestAPI.makerUnsettleReport()
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
                //console.log('getname', name)
                if (this.reportFieldNames === undefined) return name
                const field = this.reportFieldNames[name];
                if (field === undefined) return name
                return field
            }
        }
    }
</script>

<style scoped>

</style>