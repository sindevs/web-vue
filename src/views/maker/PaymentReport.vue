<template>
    <section class="section">
        <div class="container">
            <div class="print-only">
                <div class="columns">
                    <div class="column">
                        <table class="table is-fullwidth">
                            <tr>
                                <td class="has-text-centered" style="width: 100px; vertical-align: middle">
                                    <img :src="require(`@/assets/${user.agentid}.png`)" height="50" width="50">
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
                                        ວັນທີພິມ:
                                        <strong>{{BcelDateFormatter(new Date(), 'DD/MM/YYYY HH:mm:ss')}}</strong>
                                    </p>
                                    <p class="has-text-right">
                                        <strong>{{user.userid}}-{{user.fullname}}</strong>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <h1 class="title has-text-centered">ລາຍງານການຮັບຊຳລະ</h1>
            <p class="subtitle has-text-centered">ຈາກວັນທີ: <strong>{{BcelDateFormatter(startdate)}}</strong> ເຖິງວັນທີ:
                {{BcelDateFormatter(enddate)}}</p>
            <div class="no-print">
                <ComDateRangePicker :startdate="startdate" :enddate="enddate" @input-startdate="startdate = $event"
                                    @input-enddate="enddate = $event" :button-click="getReports"
                                    :isshowprint="true"
                                    :button-text="'ດຶງລາຍງານ'"/>
            </div>

            <div class="no-print">
            <b-table :data="convertedReports" :striped="true"
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
                    <b-table-column field="sn" label="SN" numeric centered>
                        {{ props.row.sn }}
                    </b-table-column>
                    <b-table-column :label="getFieldName('licenseno')" numeric centered>
                        <LicencePlateCompact :license_no="props.row.licenseno" :province_id="props.row.provincecode"
                                             :type_id="props.row.purposeno"/>

                    </b-table-column>

                    <b-table-column field="tax_year" :label="getFieldName('tax_year')" centered>
                        {{ props.row.tax_year }}
                    </b-table-column>
                    <b-table-column field="tax_amt" :label="getFieldName('tax_amt')" numeric is-right>
                        {{ props.row.tax_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column field="fine_amt" :label="getFieldName('fine_amt')" numeric is-right>
                        {{ props.row.fine_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column :label="getFieldName('total_amt')" numeric is-right>
                        {{ props.row.fine_amt + props.row.tax_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column :label="getFieldName('payment_type')" centered
                                    field="payment_type" v-if="props.row.agentid === 'BCEL'">
                        <b-tag v-if="props.row.payment_type === 'cash'" class="is-warning">ເງິນສົດ</b-tag>
                        <b-tag v-else class="is-info">ຕັດບັນຊີ</b-tag>
                    </b-table-column>

                    <b-table-column field="is_printed" :label="getFieldName('is_printed')" class="hide-on-print">
                        <b-tag class="is-warning" v-if="props.row.isprinted === 1">ພິມແລ້ວ</b-tag>
                        <b-tag class="is-primary" v-else>ຍັງບໍ່ໄດ້ພິມ</b-tag>
                    </b-table-column>
                    <b-table-column class="has-text-centered hide-on-print" field="canceled" label="ສະຖານະ" >
                        <b-tag class="is-danger" v-if="props.row.canceled === 1">ຍົກເລີກແລ້ວ</b-tag>
                        <b-tag class="is-primary" v-else>ປົກກະຕິ</b-tag>
                    </b-table-column>
                </template>

                <template slot="footer" v-if="reports.length > 0">

                    <th class="has-text-right" colspan="5">
                        ລວມ: {{convertedReports.length}} ລາຍການ
                    </th>
                    <th class="has-text-right">
                        {{_.sumBy(convertedReports, (o) => { return o.canceled === 1 ? 0 : o.tax_amt}) |
                        formatNumberLocal}}
                    </th>
                    <th class="has-text-right">
                        {{_.sumBy(convertedReports, (o) => { return o.canceled === 1 ? 0 : o.fine_amt}) |
                        formatNumberLocal}}
                    </th>
                    <th class="has-text-right">
                        {{_.sumBy(convertedReports, (o) => { return o.canceled === 1 ? 0 : o.tax_amt + o.fine_amt}) |
                        formatNumberLocal}}
                    </th>
                </template>
            </b-table>
            </div>
            <div class="print-only">
            <b-table :data="convertedReports" :striped="true"
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
                    <b-table-column field="sn" label="SN" numeric centered>
                        {{ props.row.sn }}
                    </b-table-column>
                    <b-table-column :label="getFieldName('licenseno')" numeric centered>
                        <LicencePlateCompact :license_no="props.row.licenseno" :province_id="props.row.provincecode"
                                             :type_id="props.row.purposeno"/>

                    </b-table-column>

                    <b-table-column field="tax_year" :label="getFieldName('tax_year')" centered>
                        {{ props.row.tax_year }}
                    </b-table-column>
                    <b-table-column field="tax_amt" :label="getFieldName('tax_amt')" numeric is-right>
                        {{ props.row.tax_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column field="fine_amt" :label="getFieldName('fine_amt')" numeric is-right>
                        {{ props.row.fine_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column :label="getFieldName('total_amt')" numeric is-right>
                        {{ props.row.fine_amt + props.row.tax_amt | formatNumberLocal }}
                    </b-table-column>
                    <b-table-column :label="getFieldName('payment_type')" centered
                                    field="payment_type" v-if="props.row.agentid === 'BCEL'">
                        <b-tag v-if="props.row.payment_type === 'cash'" class="is-warning">ເງິນສົດ</b-tag>
                        <b-tag v-else class="is-info">ຕັດບັນຊີ</b-tag>
                    </b-table-column>
                </template>

                <template slot="footer" v-if="reports.length > 0">

                    <th class="has-text-right" colspan="5">
                        ລວມ: {{convertedReports.length}} ລາຍການ
                    </th>
                    <th class="has-text-right">
                        {{_.sumBy(convertedReports, (o) => { return o.canceled === 1 ? 0 : o.tax_amt}) |
                        formatNumberLocal}}
                    </th>
                    <th class="has-text-right">
                        {{_.sumBy(convertedReports, (o) => { return o.canceled === 1 ? 0 : o.fine_amt}) |
                        formatNumberLocal}}
                    </th>
                    <th class="has-text-right">
                        {{_.sumBy(convertedReports, (o) => { return o.canceled === 1 ? 0 : o.tax_amt + o.fine_amt}) |
                        formatNumberLocal}}
                    </th>
                </template>
            </b-table>
            </div>
        </div>

    </section>
</template>

<script>
    import RestAPI from "../../RestAPI";
    import ComDateRangePicker from '../../components/ComDateRangePicker'
    import {get} from 'vuex-pathify'
    import LicencePlateCompact from "../../components/LicencePlateCompact";

    export default {
        name: "PaymentReport",
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
            user: get("session"),
            reportFieldNames: get('glossary@rt3_forms'),
            convertedReports() {
                return this._.map(this.reports, (rpt) => {
                    let requests = this._.map(rpt.formbody.payment_requests, (o, index) => {
                        o.seq = index;
                        rpt.sn = o.sn;
                        rpt.is_printed = o.is_printed;
                        o = Object.assign(o, rpt);
                        delete o.formbody;
                        return o
                    });


                    //rpt.tax_year = this._.map(rpt.formbody.payment_requests, 'tax_year').join(",")
                    //rpt.payment_type = this._.map(rpt.formbody.payment_requests, 'payment_type').join(",")
                    //rpt.tax_amount = this._.sumBy(rpt.formbody.payment_requests, 'tax_amt')
                    //rpt.fine_amount = this._.sumBy(rpt.formbody.payment_requests, 'fine_amt')
                    //return rpt
                    return requests
                }).reduce((o, n) => {
                    return o.concat(n)
                }, [])
            }

        },
        mounted() {
            console.log('vehicle reg report mounted');
            this.getReports()

        },
        methods: {
            getReports() {
                //console.log(vehicle)
                const d1 = this.BcelDateFormatter(this.startdate, 'YYYY-MM-DD');
                const d2 = this.BcelDateFormatter(this.enddate, 'YYYY-MM-DD');
                RestAPI.makerReportPayment(d1, d2)
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
                if (this.reportFieldNames === undefined) return name;
                const field = this.reportFieldNames[name];
                if (field === undefined) return name;
                return field
            }
        }
    }
</script>

<style scoped>
    @media print {
        td.hide-on-print {
            visibility: hidden;
        }
    }
</style>