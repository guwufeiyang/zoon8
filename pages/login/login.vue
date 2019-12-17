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
                // 返回到登录之前的那个页面
				uni.navigateBack();
			}
		}
		
	}
</script>

<style lang="less">
.container {
	.logo-box {
		width: 660upx;
		height: 340upx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		padding-top: 80upx;
		border-bottom: 1upx solid #d7d7d7;
	}
	.logo {
		width: 146upx;
		height: 146upx;
	}
	.content-box { 
		width: 660upx;
		margin: 0 auto;
		padding-top: 40upx;
	}
	.tip1 {
		font-size: 16px;
		line-height: 60upx;
		color: #000;
	}
	.tip2 {
		font-size: 14px;
		line-height: 40upx;
		color: #8f4d5b;
	}
	.btn-login {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		margin-top: 40upx;
		padding: 0;
		background: #3388ff;
		border-radius: 50upx;
		font-size: 16px;
		color: #fff;
		text-align: center;
	}	
}
</style>
