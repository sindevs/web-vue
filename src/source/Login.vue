<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="box column is-4 is-offset-4" id="login-box">
                    <h1 class="title has-text-centered">Road Tax 3</h1>
                    <h1 class="title is-5 has-text-centered">ເຂົ້າລະບົບ</h1>
                    <div class="field">
                        <label class="label">ຊື່ຜູ້ໃຊ້</label>
                        <div class="control">
                            <input type="text" class="input" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">ລະຫັດຜ່ານ</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password" @keyup.enter="doLogin">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary is-fullwidth" @click="doLogin">ເຂົ້າລະບົບ</button>
                        </div>
                    </div>
                    <!--<div class="field is-grouped">
                        <div class="control is-expanded">
                            <router-link to="/forgetpassword" class="button is-text is-fullwidth">
                                ລືມລະຫັດ
                            </router-link>
                        </div>
                        <div class="control is-expanded">
                            <router-link class="button is-text is-fullwidth" to="/registration">ສະໝັກໃຊ້</router-link>
                        </div>

                    </div>-->
                    <article class="message is-warning is-small" v-if="errorMessage">
                        <div class="message-body">
                            {{errorMessage}}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import restApi from "./../RestAPI";
    import VueJwtDecode from "vue-jwt-decode";

    export default {
		name: "Login",
		components: {},
		data() {
			return {
				username: null,
				password: null,
				errorMessage: null,
                session: null
			};
		},
		methods: {
			doLogin() {
				this.errorMessage = null;
				if (!this.validationForm()) {
					return;
				}
				const loadingComponent = this.$loading.open({});

				const req = {
					userid: this.username,
					password: this.sha2(this.password)
				};
				console.log(req);
				restApi
				.login(req)
				.then(res => {
					console.log(res.headers["content-type"]);
					const session = res.data;
					if (typeof res.data === "string") {
						console.log("error");
						return;
					}
					console.log(session);
					this.session = session;
					this.$store.set("token", session.jwt);
					this.$store.set("session", session.user);
					this.$store.set("tokeninfo", VueJwtDecode.decode(session.jwt));
					//this.$router.replace("/");
					return this.$axios.all([
						restApi.getProvinces(),
						restApi.getLicensePurposes(),
						restApi.getVehicleTypes(),
						restApi.getVehicleCategories(),
						restApi.getGlossary(),
						restApi.getBranches(),
						restApi.getUnits(),
					]);
				})
				.then(
				this.$axios.spread(
				(provinces, purposes, types, categories, glossary, brances, units) => {
					//this.$store.set("token", this.session.jwt);
					//this.$store.set("session", this.session.user);
					//this.$store.set("tokeninfo", VueJwtDecode.decode(this.session.jwt));
                    this.$store.set("provinces", provinces.data);
                    this.$store.set("vehiclePurposes", purposes.data);
                    this.$store.set("vehicleTypes", types.data);
                    this.$store.set("vehicleCategories", categories.data);
                    this.$store.set("glossary", glossary.data);
                    this.$store.set("branches", brances.data);
                    this.$store.set("units", units.data);
					this.$router.replace("/");
				}))
				.catch(err => {
                    console.log(err);
					this.$store.set("token", null);
					this.$store.set("session", null);
					this.$store.set("tokeninfo", null);
					this.$swal({
						type: 'error',
						text: 'ບໍ່ສາມາດ ເຂົ້າລະບົບໄດ້, ກະລຸນາລອງໃໝ່'
					})
				})
				.then(() => {
					loadingComponent.close();
				});
			},
			validationForm() {
				if (this.username == null || this.password == null) {
					this.errorMessage = "ກະລຸນາ ປ້ອນລະຫັດຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ";
					return false;
				}
				return true;
			}
		},
		mounted() {
			this.$store.set("token", null);
			this.$store.set("session", null);
			this.$store.set("tokeninfo", null);
		}
	}
	;
</script>

<style scoped>
    #login-box {
        padding: 20px;
        margin-top: 100px;
    }
</style>
