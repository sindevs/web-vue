<template>
  <nav class="navbar is-primary no-print" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="@/assets/bcel-white.png" width="30" height="30">
        <span>ລະບົບຮັບຊຳລະ ຄ່າທຳນຽມທາງ</span>
      </router-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        :class="{'is-active': isMenuActive}"
        @click="isMenuActive = !isMenuActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{'is-active': isMenuActive}">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <font-awesome-icon icon="file-alt"/>
            </span>
            <span>ຮັບຊຳລະ/ສະຕິກເກີ້</span>
          </a>
          <div class="navbar-dropdown">
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/payment"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="plus-circle"/>
              </span>
              <span>ຮັບຊຳລະຄ່າທຳນຽມທາງ</span>
            </router-link>
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/sticker/print"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="plus-circle"/>
              </span>
              <span>ພິມສະຕິກເກີ້ ໃຫ້ການບໍລິການອອນລາຍ</span>
            </router-link>
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/print/onlinereceipt"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="print"/>
              </span>
              <span>ພິມໃບຮັບຊໍາລະ ໃຫ້ການບໍລິການອອນລາຍ</span>
            </router-link>
            <div class="navbar-divider"></div>
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/sticker/reprint"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="plus-circle"/>
              </span>
              <span>ຂໍພິມຄືນ</span>
            </router-link>
            <div class="navbar-divider"></div>
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/payment/cancel"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="plus-circle"/>
              </span>
              <span>ຍົກເລີກການຊຳລະ</span>
            </router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <font-awesome-icon icon="car"/>
            </span>
            <span>ພາຫະນະ</span>
          </a>

          <div class="navbar-dropdown">
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/vehicle/view"
              active-class="is-active"
            >
              <span class="icon">
                <font-awesome-icon icon="redo"/>
              </span>
              <span>ເບິ່ງຂໍ້ມູນ</span>
            </router-link>

            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/vehicle/registration"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="plus-circle"/>
              </span>
              <span>ລົງທະບຽນພາຫະນະ</span>
            </router-link>

            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/vehicle/edit"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="plus-circle"/>
              </span>
              <span>ແກ້ໄຂຂໍ້ມູນພາຫະນະ</span>
            </router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <font-awesome-icon icon="book-open"/>
            </span>
            <span>ລາຍການເຄື່ອນໄຫວ</span>
          </a>
          <div class="navbar-dropdown">
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/forms/payment"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="clock"/>
              </span>
              <span>ລາຍການຮັບຊຳລະ</span>
            </router-link>
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/forms/printonline"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="clock"/>
              </span>
              <span>ລາຍການພິມໃຫ້ຊ່ອງທາງອອນລາຍ</span>
            </router-link>
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/forms/reprint"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="clock"/>
              </span>
              <span>ລາຍການຂໍພິມຄືນ</span>
            </router-link>
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/forms/payment/cancel"
              active-class="is-active"
            >
              <span class="icon">
                <font-awesome-icon icon="clock"/>
              </span>
              <span>ລາຍການຂໍຍົກເລີກການຊຳລະ</span>
            </router-link>
          </div>
        </div>

        <router-link
          @click.native="menuClicked"
          class="navbar-item"
          v-if="user.agentid === 'BCEL'"
          to="/maker/unsettle"
          active-class="is-active"
        >
          <span class="icon">
            <font-awesome-icon icon="clock"/>
          </span>
          <span>ສະຫຼຸບເງິນສົດທ້າຍມື້</span>
        </router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <font-awesome-icon icon="pencil-ruler"/>
            </span>
            <span>ດັດແກ້ການຊຳລະ</span>
          </a>
          <div class="navbar-dropdown">
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/paymore"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="pencil-ruler"/>
              </span>
              <span>ຊຳລະເພີ່ມ</span>
            </router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <font-awesome-icon icon="file-alt"/>
            </span>
            <span>ລາຍງານ</span>
          </a>

          <div class="navbar-dropdown">
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/maker/report/payment"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="file-alt"/>
              </span>
              <span>ການຮັບຊຳລະ ທັງໝົດ</span>
            </router-link>

            <router-link
              v-if="user.agentid === 'BCEL'"
              @click.native="menuClicked"
              class="navbar-item"
              to="/report/maker/payment/cash"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="file-alt"/>
              </span>
              <span>ການຮັບຊຳລະ ດ້ວຍເງິນສົດ</span>
            </router-link>

            <router-link
              v-if="user.agentid === 'BCEL'"
              @click.native="menuClicked"
              class="navbar-item"
              to="/report/maker/payment/acc"
              active-class="is-active"
              exact
            >
              <span class="icon">
                <font-awesome-icon icon="file-alt"/>
              </span>
              <span>ການຮັບຊຳລະ ຜ່ານບັນຊີ</span>
            </router-link>
            <!--
                          <div class="navbar-divider"></div>
                          <router-link @click.native="menuClicked" class="navbar-item" to="/report/maker/payment/cancel"
                                       active-class="is-active" exact>
                              <span class="icon">
                                  <font-awesome-icon icon="file-alt"/>
                              </span>
                              <span>ການຍົົກເລີກ</span>
                          </router-link>

                          <router-link @click.native="menuClicked" class="navbar-item" to="/report/maker/register"
                                       active-class="is-active">
                              <span class="icon">
                                  <font-awesome-icon icon="file-alt"/>
                              </span>
                              <span>ການລົງທະບຽນ</span>
                          </router-link>
                          <router-link @click.native="menuClicked" class="navbar-item" to="/report/maker/reprint"
                                       active-class="is-active">
                              <span class="icon">
                                  <font-awesome-icon icon="file-alt"/>
                              </span>
                              <span>ການພິມຄືນ</span>
            </router-link>-->
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link
            @click.native="menuClicked"
            class="navbar-link"
            to="/profile"
            :exact="true"
            active-class="is-active"
          >
            <span class="icon">
              <font-awesome-icon icon="user"/>
            </span>
            <span>{{user.fullname}}</span>
          </router-link>
          <div class="navbar-dropdown">
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/profile"
              active-class="is-active"
            >
              <span class="icon">
                <font-awesome-icon icon="user"/>
              </span>
              <span>ຂໍ້ມູນສ່ວນຕົວ</span>
            </router-link>
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/changepassword"
              active-class="is-active"
            >
              <span class="icon">
                <font-awesome-icon icon="key"/>
              </span>
              <span>ປ່ຽນລະຫັດຜ່ານ</span>
            </router-link>
            <router-link
              @click.native="menuClicked"
              class="navbar-item"
              to="/login"
              :exact="true"
              active-class="is-active"
            >
              <span class="icon">
                <font-awesome-icon icon="sign-out-alt"/>
              </span>
              <span>ອອກຈາກລະບົບ</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { get } from "vuex-pathify";

export default {
  name: "ComMakerMenu",
  data() {
    return {
      isMenuActive: false
    };
  },
  computed: {
    user: get("session")
  },
  methods: {
    menuClicked() {
      this.isMenuActive = false;
    }
  }
};
</script>

<style scoped>
.navbar-item {
  white-space: nowrap;
}
</style>