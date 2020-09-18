<template>
  <section class="section">
    <div class="container">
      <h1 class="title">ເບິ່ງຂໍ້ມູນພາຫະນະ</h1>
      <div class="columns">
        <div class="column">
          <LicensePlateInputForm @on-license-plate-inputed="onLincensePlateInputed"/>
        </div>
        <div class="column box">
          <b-tabs v-model="activeTab">
            <b-tab-item label="ຂໍ້ມູນພາຫະນະ">
              <VehicleSimpleInfo :vehicle-info="vehicleInfo" v-if="vehicleInfo"/>
            </b-tab-item>

            <b-tab-item label="ປະຫວັດການຊໍາລະ">
              <table
                class="table is-fullwidth is-bordered is-narrow"
                v-if="vehicleInfo && vehicleInfo.paymenthistory"
              >
                <thead>
                  <tr>
                    <th>ປີ</th>
                    <th>ຄ່າທຳນຽມ</th>
                    <th>ຄ່າປັບໄໝ</th>
                    <th>ຈ່າຍຜ່ານ</th>
                    <th>ວັນທີ</th>
                    <th>SN</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in vehicleInfo.paymenthistory" :key="index">
                    <td>{{row.tax_year}}</td>
                    <td>{{row.tax_amt | formatNumberLocal}}</td>
                    <td>{{row.fine_amt | formatNumberLocal}}</td>
                    <td>
                      <b-taglist>
                        <b-tag>{{row.payment_channel}}</b-tag>
                        <b-tag>{{row.agentid}}</b-tag>
                      </b-taglist>
                    </td>
                    <td>{{row.payment_date}}</td>
                    <td>{{row.seq_no}}</td>
                    <td>
                      <button
                        class="button is-small"
                        @click="selectedHistory = row; showRawData = true"
                      >
                        <span class="icon">&#x1F50D;</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </div>
    <b-modal :active.sync="showVehicleSelection" :canCancel="true">
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="columns is-multiline">
            <div class="column" v-for="(v, index) in vehicleInfos" :key="v.idx">
              <div class="box">
                <LicencePlate
                  :type_id="v.purpose_no"
                  :license_no="v.license_no"
                  :province_id="v.province_code"
                  @click.native="vehicleDidSelected(index)"
                />
                <p class="has-text-centered">{{v.make}} {{v.model}}</p>
                <p class="has-text-centered">ເລກຈັກ: {{v.engine_no }}</p>
                <p class="has-text-centered">ເລກຖັງ: {{v.chassis_no}}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </b-modal>
  </section>
</template>

<script>
import VehicleSimpleInfo from "../components/VehicleSimpleInfo";
import LicensePlateInputForm from "../components/LicensePlateInputForm";
import LicencePlate from "../components/LicencePlate";
import RestAPI from "../RestAPI";
import BTabItem from "buefy/src/components/tabs/TabItem";
export default {
  name: "VehicleViewer",
  components: {
    VehicleSimpleInfo,
    LicensePlateInputForm,
    LicencePlate,
    BTabItem
  },
  data() {
    return {
      activeTab: 0,
      showVehicleSelection: false,
      vehicleInfos: null,
      vehicleInfo: null
    };
  },
  mounted() {
    this.vehicleInfo = {};
  },
  methods: {
    vehicleDidSelected(index) {
      if (this.vehicleInfos[index]) {
        this.vehicleInfo = this.vehicleInfos[index];
        this.showVehicleSelection = false;
      }
    },
    onLincensePlateInputed(license_no, province_code, purpose_no) {
      RestAPI.queryPaymentInformation(
        license_no,
        province_code,
        purpose_no
      ).then(res => {
        console.log(res);
        if (res.data.length == 0) {
          this.$swal({
            text: "ບໍ່ພົບຂໍ້ມູນ ປ້າຍ",
            type: "error"
          });
          this.vehicleInfo = null;
          return;
        }
        this.showVehicleSelection = false;
        this.vehicleInfos = res.data;
        if (this.vehicleInfos && this.vehicleInfos.length > 0) {
          this.showVehicleSelection = true;
        } else {
          this.vehicleInfo = res.data[0];
        }
      });
    },
    goback() {
      console.log("goback");
    }
  }
};
</script>
