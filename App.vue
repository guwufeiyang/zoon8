<script>
	import { mapState } from 'vuex'
	export default {
		globalData: {  
			bandInfo: {}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLaunch: async function() {
			plus.screen.lockOrientation('portrait-primary'); // 锁定竖屏
			
			console.log('App onLaunch')
			
			//
			if(this.userInfo.token){
				// uni.redirectTo({url: '/pages/billboard/billboard'})
			} else {
				// uni.redirectTo({url: '/pages/login/login'})
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="less">
	@import url('common/common.less');
</style>
