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

<style>
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video,ul,li {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		font-family: PingFangSC-Medium,PingFang SC;
		list-style: none;
	}
	body, html {
		overflow-x: hidden;
	}
	* {
	  -webkit-box-sizing: border-box;
	  box-sizing: border-box;
	  -webkit-overflow-scrolling: touch;
	}
</style>
