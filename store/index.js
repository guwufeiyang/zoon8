import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
	state: {
		userInfo: {
			name: "",
			token: null
		},
		bands: [],
		currentBand: null
	},
	mutations: {
		login(state, userInfo) {
			state.userInfo = userInfo;
		},
		logout(state) {
			state.userInfo = {
				name: "",
				token: null
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
