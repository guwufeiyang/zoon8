import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
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
			uni.setStorage({
				key: 'userInfo',
				data: userInfo
			})
		},
		logout(state) {
			state.userInfo = {
				name: "",
				token: null
			};
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		setBands(state, bands) {
			state.bands = bands
			uni.setStorage({
				key: 'bands',
				data: bands
			})
		},
		setCurrentBand(state, currentBand) {
			state.currentBand = currentBand
			uni.setStorage({
				key: 'currentBand',
				data: currentBand
			})
		}
	}
})

export default store
