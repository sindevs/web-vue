import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import lodash from "lodash";
import interceptorSetup from "./axios.interceptor";
import TreeView from "vue-json-tree-view"
Vue.use(TreeView)
import buefy from 'buefy'
//import 'buefy/dist/buefy.css';
import "./assets/style.scss";
import VueProgressBar from "vue-progressbar";
import VueSweetalert2 from "vue-sweetalert2";
import mixin from "./mixin";
import VeeValidate from 'vee-validate';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faUpload,
	faCoffee,
	faBookOpen,
	faCheck,
	faCheckCircle,
	faPencilAlt,
	faPlusCircle,
	faSignOutAlt,
	faTimes,
	faUser,
	faArrowLeft,
	faEdit,
	faPrint,
	faRedo,
	faClock,
	faKey,
	faHome,
	faCreditCard,
	faFileAlt,
	faFileContract,
	faSave,
	faSearch,
	faTrash,
	faPlus,
faPencilRuler, faCar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
faCar,
faUpload,
faCoffee,
faPlusCircle,
faCheckCircle,
faBookOpen,
faSignOutAlt,
faUser,
faCheck,
faPencilAlt,
faTimes,
faArrowLeft,
faEdit,
faPrint,
faRedo,
faClock,
faKey,
faHome,
faCreditCard,
faFileAlt,
faSave,
faSearch,
faTrash,
faFileContract,
faPlus,
faPencilRuler
);
//import './ValidationRules'
Vue.use(VeeValidate);
Vue.use(VueProgressBar, {
	color: "#FF5722",
	failedColor: "red",
	height: "10px",
	position: "relative"
});
Vue.use(buefy);
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

Vue.mixin(mixin);
Vue.component("font-awesome-icon", FontAwesomeIcon); // registered globally
Object.defineProperty(Vue.prototype, "$axios", { value: axios });
Object.defineProperty(Vue.prototype, "_", { value: lodash });
interceptorSetup();
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
