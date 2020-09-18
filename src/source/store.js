import Vue from "vue";
import Vuex from "vuex";
import pathify from './pathify'
import {make} from 'vuex-pathify'
import createPersistedState from 'vuex-persistedstate'

//bcel store style
//,,vloof

const state = {
	token: null,
	session: null,
	tokeninfo: null,
	provinces: [],
	vehiclePurposes: [],
	vehicleCategories: [],
	vehicleTypes: [],
	glossary: {},
	branches: [],
	units: []
}
const mutations = make.mutations(state)
Vue.use(Vuex)
export default new Vuex.Store({
	state,
	mutations,
	plugins: [
		pathify.plugin, createPersistedState({key: 'roadtax3', storage: window.sessionStorage})
	]
});
