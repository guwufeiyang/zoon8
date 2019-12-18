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
	
	
	
	/* #ifdef MP */
	page {
		background: #FAF9F9;
		overflow-x: hidden;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		color: #fff;
		font-size: 16px;
		position: relative;
		top: 64upx;
		z-index: 99;
		text-align: center;
	}
	.content {
		position: relative;
		padding: 108upx 0 0 0;
	}
	
	/* #endif */
	
	/* #ifdef H5 */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		color: #fff;
		font-size: 16px;
		position: relative;
		top: 60upx;
		z-index: 99;
		text-align: center;
	}
	.content {
		position: relative;
		padding: 128upx 0 0 0;
	}
	/* #endif */
	
	page {
		background: #FAF9F9;
		height: 100%;
	}
	
	.container {
		height: 100%;
		overflow-x: hidden;
		background: #FAF9F9;
	}
	.section {
		width: 686upx;
		margin: 0 auto 20upx;
		background: rgba(255,255,255,1);
		box-shadow: 0px 2upx 40upx 0px rgba(0,0,0,0.04);
		border-radius: 16upx;
	}
	
	.icon-integral {
		display: inline-block;
		width: 20upx;
		height: 20upx;
		background: url(/static/icon-integral.png) no-repeat left top;
		background-size: 100%;
		margin-left: 4upx;
	}
</style>
