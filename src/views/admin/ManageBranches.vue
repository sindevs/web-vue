<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title">
            ສາຂາ
            <a href="#" @click="addbranch()" class="button is-pulled-right is-primary">
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </a>
          </h1>
          <h4 class="subtitle" v-if="branches">ທັງໝົດ {{branches.length}} ສາຂາ</h4>
          <div class="box">
            <table class="table is-fullwidth" v-if="branches">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ລະຫັດ</th>
                  <th>ຊື່ ສາຂາ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in branches" :key="index">
                  <td>{{index + 1}}</td>
                  <td>{{item.branchid}}</td>
                  <td>{{item.branchname}}</td>
                  <td>
                    <div class="buttons are-medium has-text-right">
                      <button class="button is-info" @click="viewbranch(item)">
                        <font-awesome-icon icon="search"></font-awesome-icon>
                      </button>
                      <button class="button is-warning" @click="updatebranch(item)">
                        <font-awesome-icon icon="edit"></font-awesome-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="column">
          <div class="box" v-if="branch && units">
            <h6 class="title">
              ໜ່ວຍບໍລິການ
              <a href="#" @click="addunit()" class="button is-pulled-right is-primary">
                <font-awesome-icon icon="plus"></font-awesome-icon>
              </a>
            </h6>
            <h6 class="subtitle">ທີ່ຂຶ້ນກັບ ສາຂາ {{branch.branchname}}</h6>
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ລະຫັດ</th>
                  <th>ຊື່ ໜ່ວຍບໍລິການ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in units" :key="index">
                  <td>{{index + 1}}</td>
                  <td>{{item.unitid}}</td>
                  <td>{{item.unitname}}</td>
                  <td>
                    <div class="buttons are-medium has-text-right">
                      <button class="button is-warning" @click="updateunit(item)">
                        <font-awesome-icon icon="edit"></font-awesome-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="modal is-active" v-if="isshowformbranch && branch">
      <div class="modal-background" @click="isshowformbranch = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ເພີ່ມ/ແກ້ໄຂຂໍ້ມູນ ສາຂາ</p>
          <button class="delete" aria-label="close" @click="isshowformbranch = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column" v-if="isshowbranchid">
              <b-field label="ລະຫັດສາຂາ" expanded>
                <b-field>
                  <b-input placeholder="ລະຫັດສາຂາ" expanded v-model="branch.branchid"></b-input>
                </b-field>
              </b-field>
            </div>
            <div class="column">
              <b-field label="ຊື່ສາຂາ" expanded>
                <b-field>
                  <b-input placeholder="ຊື່ສາຂາ" expanded v-model="branch.branchname"></b-input>
                </b-field>
              </b-field>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="savebranch()">
            <font-awesome-icon icon="save"></font-awesome-icon>ບັນທຶກ
          </button>
        </footer>
      </div>
    </div>

    <div class="modal is-active" v-if="isshowformunit && unit">
      <div class="modal-background" @click="isshowformunit = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ເພີ່ມ/ແກ້ໄຂຂໍ້ມູນ ໜ່ວຍບໍລິການ</p>
          <button class="delete" aria-label="close" @click="isshowformunit = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column" v-if="isshowunitid">
              <b-field label="ລະຫັດໜ່ວຍບໍລິການ" expanded>
                <b-field>
                  <b-input placeholder="ລະຫັດໜ່ວຍບໍລິການ" expanded v-model="unit.unitid"></b-input>
                </b-field>
              </b-field>
            </div>
            <div class="column">
              <b-field label="ຊື່ໜ່ວຍບໍລິການ" expanded>
                <b-field>
                  <b-input placeholder="ຊື່ໜ່ວຍບໍລິການ" expanded v-model="unit.unitname"></b-input>
                </b-field>
              </b-field>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="saveunit()">
            <font-awesome-icon icon="save"></font-awesome-icon>ບັນທຶກ
          </button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
  import {get} from "vuex-pathify";
  import RestAPI from "../../RestAPI";

  export default {
  data() {
    return {
      branches: null,
      units: null,
      isshowformbranch: false,
      isshowformunit: false,
      branch: null,
      unit: null,
      isshowbranchid: false,
      isshowunitid: false
    };
  },
  computed: {
    user: get("session")
  },
  mounted() {
    this.get();
  },
  methods: {
    addbranch() {
      this.branch = { branchid: null, branchname: null };
      this.isshowformbranch = true;
      this.isshowbranchid = true;
    },
    addunit() {
      this.unit = { unitid: null, unitname: null };
      this.isshowformunit = true;
      this.isshowunitid = true;
    },
    viewbranch(b) {
      this.branch = b;
      this.units = null;
      RestAPI.getUnits().then(res => {
        this.units = this._.filter(res.data, u => {
          return u.branchid === b.branchid;
        });
      });
    },
    get() {
      RestAPI.getBranches().then(res => {
        this.branches = res["data"];
      });
    },
    savebranch() {
      if (this.branch.branchid) {
        this.branch.agentid = this.user.agentid;
        RestAPI.addbranch(this.branch).then(res => {
          this.$swal({text: "ສຳເລັດ", type: "success"});
          this.get();
          this.branch = null;
          this.units = null;
        });
      } else {
        this.branch.agentid = this.user.agentid;
        RestAPI.update(this.branch).then(res => {
          this.$swal({text: "ສຳເລັດ", type: "success"});
          this.get();
          this.branch = null;
          this.units = null;
        });
      }
    },
    saveunit() {
      this.unit.branchid = this.branch.branchid;
      this.unit.agentid = this.user.agentid;
      RestAPI.addunit(this.unit).then(res => {
        this.$swal({ text: "ສຳເລັດ", type: "success" });
        this.get();
        this.branch = null;
        this.units = null;
        this.isshowformunit = false;
        this.unit = null;
      });
    },
    updatebranch(b) {
      this.branch = b;
      this.isshowformbranch = true;
      this.isshowbranchid = false;
    },
    updateunit(u) {
      this.unit = u;
      this.isshowformunit = true;
      this.isshowunitid = false;
    }
  }
};
</script>

<style>
</style>
