<template>
	<view class="container">
		<view class="logo-box">
			<image src="../../static/logo.png" class="logo"></image>
		</view>
		<view class="content-box">
			<view class="tip1">申请获取以下权限</view>
			<view class="tip2">获取你的公开信息(昵称，头像)</view>
			<button class="btn-login" @click="doLogin">登录授权</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'
	
	export default {
		data() {
			return {
				loading: false,
				
			}
		}, 
		computed: {
			...mapState(['userInfo'])
		},
        methods: {
			...mapMutations(['login']),
			async doLogin(){
				var getCodeRes = await arequest('/getWechatCodeUrl', null, {})
				var getCodeUrl = getCodeRes.data
				if(getCodeUrl) {
					// if(plus && plus.runtime) {
					// 	plus.runtime.openURL(getCodeUrl);
					// } else {
						window.location.href = getCodeUrl
					// }
				}
			}
		}
	}
</script>

<style lang="less">
.container {
	.logo-box {
		width: 670upx;
		height: 384upx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		padding-top: 80upx;
		border-bottom: 1upx solid #c8c7cc;
	}
	.logo {
		width: 282upx;
		height: 282upx;
	}
	.content-box { 
		width: 660upx;
		margin: 0 auto;
		padding-top: 40upx;
	}
	.tip1 {
		font-size: 16px;
		line-height: 80upx;
		color: #414348;
	}
	.tip2 {
		font-size: 16px;
		line-height: 70upx;
		color: #95989c;
	}
	.btn-login {
		position: absolute;
		left: 50%;
		bottom: 240rpx;
		width: 332upx;
		height: 100upx;
		line-height: 100upx;
		margin-left: -166upx;
		color: #fff;
		font-size: 16px;
		background: linear-gradient(127deg,rgba(250,114,104,1) 0%,rgba(117,96,249,1) 100%);
		box-shadow: 0px 12upx 20upx 0px rgba(184,105,176,0.54);
		border-radius: 100upx;
	}	
}
</style>
