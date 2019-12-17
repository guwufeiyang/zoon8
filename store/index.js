import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {}
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
            state.userInfo = {};
			uni.removeStorage({
				key:'userInfo'
			})
        }
    }
})

export default store
