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
    <div class="navbar-start">
      <router-link
        @click.native="menuClicked"
        class="navbar-item"
        to="/admin/users"
        active-class="is-active"
      >
        <span class="icon">
          <font-awesome-icon icon="user"/>
        </span>
        <span>ຂໍ້ມູນຜູ້ໃຊ້</span>
      </router-link>

      <router-link
        @click.native="menuClicked"
        class="navbar-item"
        to="/admin/branches"
        active-class="is-active"
      >
        <span class="icon">
          <font-awesome-icon icon="home"/>
        </span>
        <span>ສາຂາ</span>
      </router-link>

      <router-link
        @click.native="menuClicked"
        class="navbar-item"
        to="/admin/report/payments"
        active-class="is-active"
      >
        <span class="icon">
          <font-awesome-icon icon="book-open"/>
        </span>
        <span>ລາຍງານການຊໍາລະ</span>
      </router-link>
    </div>
    <div class="navbar-menu" :class="{'is-active': isMenuActive}">
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
            <span>{{user.firstname}} {{user.lastname}}</span>
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
              <span>{{user.fullname}}</span>
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
          </div>
        </div>
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
  </nav>
</template>

<script>
import { get } from "vuex-pathify";

export default {
  name: "ComAdminMenu",
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