<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        ຈັດການ ຂໍ້ມູນຜູ້ໃຊ້        
        <router-link to="/admin/user/registration"
        class="button is-pulled-right is-primary" @click="add()">
          <font-awesome-icon icon="plus"></font-awesome-icon>
        </router-link>
      </h1>
      <p class="subtitle" v-if="users">ທັງໝົດ: <b>{{users.length}}</b> ຄົນ</p>      
      <div class="box">
        <table class="table is-fullwidth" v-if="users">
          <thead>
            <tr>
              <th>#</th>
              <th>ຊື່ຜູ້ໃຊ້</th>
              <th>ຊື່ ແລະ ນາມສະກຸນ</th>
              <th>ເບີໂທ</th>
              <th>ສາຂາ</th>
              <th>ໜ່ວຍ</th>
              <th>ROLE-STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in users" :key="index">
              <td>{{index + 1}}</td>
              <td>{{item.userid}}</td>
              <td>{{item.fullname}}</td>
              <td>{{item.contactno}}</td>
              <td>{{item.branchid}} - {{item.branchid | branchname}}</td>
              <td>{{item.unitid}} - {{item.unitid | unitname}}</td>
              <td>
                <span class="tag">{{item.roleid}}</span>                
                <span
                  class="tag"
                  :class="{'is-primary': item.status === 'ACTIVE', 'is-danger': item.status === 'INACTIVE'}"
                >{{item.status}}</span>
              </td>
              <td>
                <div class="buttons are-medium">
                  <button class="button is-info" @click="view(item)">
                    <font-awesome-icon icon="search"></font-awesome-icon>
                  </button>
                  <button class="button is-warning" @click="update(item)">
                    <font-awesome-icon icon="edit"></font-awesome-icon>
                  </button>
                  <button class="button is-danger" @click="resetpassword(item)">
                    <font-awesome-icon icon="key"></font-awesome-icon>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal is-active" v-if="isupdateuser && user">
      <div class="modal-background" @click="isupdateuser = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{user.agentid}}</p>
          <button class="delete" aria-label="close" @click="isupdateuser = false"></button>
        </header>
        <section class="modal-card-body" style="min-height: 30em">
          <div class="columns">
            <div class="column">
              <b-field label="ເລືອກສາຂາ" expanded>
                <multiselect
                  placeholder="ສາຂາ"
                  v-model="newbranch"
                  label="branchname"
                  track-by="branchid"
                  :options="branches"
                  @change="getunits()"
                ></multiselect>
              </b-field>

              <b-field label="ເລືອກໜ່ວຍບໍລິການ" expanded>
                <multiselect
                  placeholder="ໜ່ວຍບໍລິການ"
                  v-model="newunit"
                  label="unitname"
                  track-by="unitid"
                  :options="units"
                ></multiselect>
              </b-field>
              <br>
              <b-field label="ເລືອກສິດຜູ້ໃຊ້: ">
                <b-radio-button v-model="user.roleid" native-value="ADMIN" type="is-success">
                  <span>ADMIN</span>
                </b-radio-button>

                <b-radio-button v-model="user.roleid" native-value="CHECKER" type="is-success">
                  <span>CHECKER</span>
                </b-radio-button>

                <b-radio-button v-model="user.roleid" native-value="MAKER" type="is-success">
                  <span>MAKER</span>
                </b-radio-button>
              </b-field>

              <b-field label="ສະຖານະ: ">
                <b-radio-button v-model="user.status" native-value="ACTIVE" type="is-success">
                  <span>ACTIVE</span>
                </b-radio-button>

                <b-radio-button v-model="user.status" native-value="INACTIVE" type="is-danger">
                  <span>INACTIVE</span>
                </b-radio-button>
              </b-field>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="updateuser()">
            <font-awesome-icon icon="save"></font-awesome-icon>ບັນທຶກ
          </button>
        </footer>
      </div>
    </div>
    <div class="modal is-active" v-if="isshowuser && user">
      <div class="modal-background" @click="isshowuser = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{user.userid}}</p>
          <button class="delete" aria-label="close" @click="isshowuser = false"></button>
        </header>
        <section class="modal-card-body">
          <table class="table is-fullwidth">
            <tbody>
              <tr>
                <td>ຊື່ ແລະ ນາມສະກຸນ</td>
                <th>{{user.fullname}}</th>
              </tr>
              <tr>
                <td>ເບີໂທ</td>
                <th>{{user.contactno}}</th>
              </tr>
              <tr>
                <td>email</td>
                <th>{{user.email}}</th>
              </tr>
              <tr>
                <td>ວັນທີລົງທະບຽນ</td>
                <th>{{user.registerdate}}</th>
              </tr>
              <tr>
                <td>ສາຂາ</td>
                <th>{{user.branchid}} - {{user.branchid | branchname}}</th>
              </tr>
              <tr>
                <td>ໜ່ວຍ</td>
                <th>{{user.unitid}} - {{user.unitid | unitname}}</th>
              </tr>
              <tr>
                <td>Role</td>
                <th>{{user.roleid}}</th>
              </tr>
              <tr>
                <td>ສະຖານະ</td>
                <th>{{user.status}}</th>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { get } from "vuex-pathify";
import Multiselect from "vue-multiselect";
import BField from "buefy/src/components/field/Field";
import RestAPI from "../../RestAPI";

export default {
  components: { Multiselect, BField },
  data() {
    return {
      users: null,
      user: null,
      newbranch: null,
      isshowuser: false,
      isupdateuser: false,
      newunit: null
    };
  },
  computed: {
    branches: get("branches"),
    units: get("units")
  },
  mounted() {
    this.get();
  },
  methods: {
    updateuser() {
      var param = this.user;
      param.newroleid = this.user.roleid;
      param.unitid = this.newunit.unitid;
      param.branchid = this.newbranch.branchid;
      RestAPI.updateuser(param).then(res => {
        this.user = res;
        this.isupdateuser = false;
      });
    },
    getunits() {
      var branch = this.newbranch;
      this.units = this._.filter(this.units, u => {
        return u.branchid === branch.branchid;
      });
    },
    get() {
      RestAPI.getusers().then(res => {
        this.users = res.data;
      });
    },
    add() {},
    update(u) {
      this.user = u;
      this.newbranch = this._.find(this.branches, b => {
        return b.branchid === u.branchid;
      });
      this.newunit = this._.find(this.units, b => {
        return b.unitid === u.unitid;
      });
      this.isupdateuser = true;
    },
    view(u) {
      this.user = u;
      this.isshowuser = true;
    },
    resetpassword(user) {
      this.$swal({
        title: "ປ້ອນລະຫັດຜ່ານໃໝ່",
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
          class: "has-text-centered"
        },
        showCancelButton: true,
        confirmButtonText: "ບັນທຶກ",
        cancelButtonText: "ຍົກເລີກ",
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          user.password = this.sha2(result.value);
          RestAPI.resetpassword(user).then(() => {
            this.$swal({
              title: "ສຳເລັດ",
              type: "success"
            });
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
