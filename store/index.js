import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { localStorage } from 'mp-storage'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: localStorage
})
const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
	state: {
		userInfo: {
			name: ""
		},
		bands: [],
		currentBand: null
	},
	mutations: {
		login(state, userInfo) {
			if(userInfo.id) {
				userInfo.roles = JSON.parse(userInfo.roles || "[]")
				userInfo.achievements = JSON.parse(userInfo.achievements || "[]")
				state.userInfo = userInfo;
			} else {
				state.userInfo = {
					name: ""
				}
			}
		},
		logout(state) {
			state.userInfo = {
				name: ""
			}
		},
		setBands(state, bands) {
			state.bands = bands
		},
		setCurrentBand(state, currentBand) {
			state.currentBand = currentBand
		}
	}
})

export default store
