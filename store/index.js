import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {
			name: "",
			token: null
		}
    },
    mutations: {
        login(state, userInfo) {
            state.userInfo = userInfo;
			uni.setStorage({
				key:'userInfo',
				data: userInfo
			})
        },
        logout(state) {
            state.userInfo = {
				name: "",
				token: null
			};
			uni.removeStorage({
				key:'userInfo'
			})
        }
    }
})

export default store
