<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <div class="box">
            <h1 class="title">ປ່ຽນລະຫັດຜ່ານ</h1>
            <hr>
            <b-field label="ລະຫັດຜ່ານ ປະຈຸບັນ" expanded>
              <b-field>
                <b-input
                  type="password"
                  placeholder="ລະຫັດຜ່ານ ປະຈຸບັນ"
                  expanded
                  password-reveal
                  v-model="passwordcurrent"
                ></b-input>
              </b-field>
            </b-field>
            <b-field label="ລະຫັດຜ່ານ ໃໝ່" expanded>
              <b-field>
                <b-input
                  password-reveal
                  type="password"
                  placeholder="ລະຫັດຜ່ານ ໃໝ່"
                  expanded
                  v-model="passwordnew"
                ></b-input>
              </b-field>
            </b-field>
            <b-field label="ຢືນຢັນລະຫັດຜ່ານ" expanded>
              <b-field>
                <b-input
                  password-reveal
                  type="password"
                  placeholder="ຢືນຢັນລະຫັດຜ່ານ"
                  expanded
                  v-model="passwordconfirm"
                ></b-input>
              </b-field>
            </b-field>
            <hr>
            <button class="button is-primary" @click="save()">
              <font-awesome-icon icon="save"></font-awesome-icon>ບັນທຶກ
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { get } from "vuex-pathify";
import RestAPI from "../RestAPI";
export default {
  name: "ChangeUserPassword",
  computed: {
    user: get("session")
  },
  data() {
    return {
      passwordcurrent: null,
      passwordnew: null,
      passwordconfirm: null
    };
  },
  methods: {
    save() {
      if (this.passwordnew !== this.passwordconfirm) {
        this.$swal({ text: "ຢືນຢັນ ລະຫັດຜ່ານໃໝ່ ບໍ່ຖືກຕ້ອງ", type: "success" });
        return;
      }
      var params = {
        userid: this.user.userid,
        agentid: this.user.agentid,
        oldpassword: this.sha2(this.passwordcurrent),
        password: this.sha2(this.passwordnew)
      };
      RestAPI.resetselfpassword(params).then(res => {
        this.$swal({ text: "ສຳເລັດ", type: "success" });
        this.passwordcurrent = null;
        this.passwordnew = null;
        this.passwordconfirm = null;
      });
    }
  }
};
</script>

<style scoped>
</style>