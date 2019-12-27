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
		gifts: null,
		gains: null,
		tasks: null,
		userInfo: {
			name: "",
			band: {
			}
		},
		
		currentBand: null
	},
	mutations: {
		setCommon(state, common) {
			state.gifts = common.gifts
			state.gains = common.gains
			state.tasks = common.tasks
		},
		login(state, userInfo) {
			if(userInfo.id) {
				userInfo.roles = JSON.parse(userInfo.roles || "[]")
				userInfo.achievements = JSON.parse(userInfo.achievements || "[]")
				state.userInfo = userInfo;
			} else {
				uni.removeStorageSync("jwt")
				state.userInfo = {
					name: "",
					band: {
					}
				}
			}
		},
		setCurrentBand(state, currentBand) {
			state.currentBand = currentBand
		}
	}
})

export default store
