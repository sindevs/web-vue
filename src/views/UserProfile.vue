<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <div class="box">
            <h1 class="title">ແກ້ໄຂຂໍ້ມູນສ່ວນຕົວ</h1>
            <hr>
            <b-field label="ຊື່ຜູ້ໃຊ້" expanded>
              <b-field>
                <b-input placeholder="ຊື່ຜູ້ໃຊ້" expanded v-model="user.fullname"></b-input>
              </b-field>
            </b-field>
            <b-field label="ເບີໂທ" expanded>
              <b-field>
                <b-input placeholder="ເບີໂທ" expanded v-model="user.contactno"></b-input>
              </b-field>
            </b-field>
            <b-field label="ອີເມວ" expanded>
              <b-field>
                <b-input placeholder="ອີເມວ" expanded v-model="user.email"></b-input>
              </b-field>
            </b-field>
            <hr>
            <button class="button is-primary" @click="save()">
                <font-awesome-icon icon="save"></font-awesome-icon> ບັນທຶກ
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
  name: "UserProfile",
  computed: {
    user: get("session")
  },
  methods: {
    save() {
      RestAPI.edituser(this.user).then(result => {
        this.$swal({ text: "ສຳເລັດ", type: "success" });
      });
    }
  }
};
</script>

<style scoped>
</style>