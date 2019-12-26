<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from './room8Util.js'
	export default {
		globalData: {  
			bandInfo: {}
		},
		computed: {
			...mapState(['gifts'])
		},
		methods: {
			...mapMutations(['setCommon']),
			async loadCommon() {
				if(!this.gifts){
					let commonRes = await arequest('/common', null, {})
					this.setCommon(commonRes.data)
				}
			}
		},
		onLaunch: async function() {
			plus.screen.lockOrientation('portrait-primary'); // 锁定竖屏
			this.loadCommon()
		},
		onShow: function() {
			this.loadCommon()
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="less">
	@import url('common/common.less');
</style>
