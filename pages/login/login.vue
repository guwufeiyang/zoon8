<template>
	<view>
		
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	import { arequest } from '../../room8Util.js'
	
	export default {
		data() {
			return {
				
			}
		}, 
		computed: {
			...mapState(['userInfo'])
		},
        methods: {
			...mapMutations(['login']),
			async doLogin(){
				var loginRes = await arequest('/mockLogin', null, {
				})
				this.login(loginRes.data)
			}
		},
		onReady() {
			// TODO ÐÞ¸ÄÎªµÇÂ¼Ò³Ãæ
			// this.doLogin()
		}
	}
</script>

<style>

</style>
