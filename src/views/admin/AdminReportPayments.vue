<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ລາຍງານສັງລວມການຊໍາລະ</h1>
            <p class="subtitle">
                ສາຂາ:
                <strong>{{branch ? branch.branchname : 'ທັງໝົດ'}}</strong>
                , ວັນທີ:
                <strong>{{BcelDateFormatter(startdate, "YYYY-MM-DD")}} ຫາ {{BcelDateFormatter(enddate,
                    "YYYY-MM-DD")}}</strong>
            </p>
            <div class="no-print">
                <div class="columns card">
                    <div class="column is-3">
                        <b-field expanded>
                            <multiselect
                                    :options="branches"
                                    label="branchname"
                                    placeholder="ສາຂາທັງໝົດ"
                                    track-by="branchid"
                                    v-if="branches"
                                    v-model="branch"
                            ></multiselect>
                        </b-field>
                    </div>
                    <div class="column">
                        <ComDateRangePicker
                                :button-click="gets"
                                :button-text="'ເບິ່ງ'"
                                :enddate="enddate"
                                :isshowprint="true"
                                :startdate="startdate"
                                @input-enddate="enddate = $event"
                                @input-startdate="startdate = $event"
                        />
                    </div>
                </div>
                <hr>
            </div>
            <div class="columns">
                <div class="column">
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">ລາຍການທັງໝົດ</p>
                                <p class="title">{{convertedReports.length | formatNumberLocal}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">ລວມຈຳນວນເງິນ</p>
                                <p
                                        class="title"
                                >{{_.sumBy(convertedReports, o => {return o.canceled === 1 ? 0 : o.tax_amt}) |
                                    formatNumberLocal}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">ລວມຄ່າປັບໄໝ</p>
                                <p
                                        class="title"
                                >{{_.sumBy(convertedReports, o => {return o.canceled === 1 ? 0 : o.fine_amt}) |
                                    formatNumberLocal}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">ລວມທັງໝົດ</p>
                                <p class="title">
                                    {{_.sumBy(convertedReports, (o) => { return o.canceled === 1 ? 0 : o.tax_amt +
                                    o.fine_amt}) |
                                    formatNumberLocal}}
                                </p>
                            </div>
                        </div>
                    </nav>
                    <hr>
                    <table class="table is-fullwidth">
                        <thead>
                        <tr>
                            <th>ສາຂາ</th>
                            <th class="has-text-right">ລາຍການ</th>
                            <th class="has-text-right">ຈຳນວນເງິນ</th>
                            <th class="has-text-right">ຄ່າປັບໄໝ</th>
                            <th class="has-text-right">ລວມທັງໝົດ</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="index" v-for="(item, index) in branchreport">
                            <td>{{index}} - {{index | branchname}}</td>
                            <td class="has-text-right">{{item.length}}</td>
                            <td class="has-text-right">{{_.sumBy(item, 'tax_amt') | formatNumberLocal}}</td>
                            <td class="has-text-right">{{_.sumBy(item, 'fine_amt') | formatNumberLocal}}</td>
                            <td class="has-text-right">{{_.sumBy(item, o => {return o.tax_amt + o.fine_amt}) |
                                formatNumberLocal}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import RestAPI from "../../RestAPI";
    import Multiselect from "vue-multiselect";
    import ComDateRangePicker from "../../components/ComDateRangePicker";
    import LicencePlate from "../../components/LicencePlate";
    import BField from "buefy/src/components/field/Field";
    import {get} from "vuex-pathify";

    export default {
        name: 'adminreport',
        components: {ComDateRangePicker, Multiselect, BField, LicencePlate},
        data() {
            return {
                startdate: new Date(),
                enddate: new Date(),
                branch: null,
                reports: null
            };
        },
        computed: {
            branches: get("branches"),
            units: get("units"),
            convertedReports() {
                return this._.map(this.reports, rpt => {
                    let requests = this._.map(rpt.formbody.payment_requests, (o, index) => {
                        o.seq = index;
                        rpt.sn = o.sn;
                        rpt.is_printed = o.is_printed;
                        o = Object.assign(o, rpt);
                        delete o.formbody;
                        return o;
                    });
                    requests = this._.filter(requests, (o) => {
                        return o.canceled !== 1;
                    });
                    return requests;
                }).reduce((o, n) => {
                    return o.concat(n);
                }, []);
            },
            branchreport() {
                return _.groupBy(this.convertedReports, 'branchid');
            }
        },
        mounted() {
            this.gets();
        },
        methods: {
            print() {
                window.print();
            },
            gets() {
                const d1 = this.BcelDateFormatter(this.startdate, "YYYY-MM-DD");
                const d2 = this.BcelDateFormatter(this.enddate, "YYYY-MM-DD");
                RestAPI.adminReportPayment(d1, d2).then(res => {
                    this.reports = this.branch
                        ? this._.filter(res["data"], o => {
                            return o.branchid === this.branch.branchid;
                        })
                        : res["data"];
                });
            }
        }
    };
</script>
