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
			// #ifdef APP-PLUS
				plus.screen.lockOrientation('portrait-primary');
			// #endif

			this.loadCommon()
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style lang="less">
	@import url('common/common.less');
</style>
