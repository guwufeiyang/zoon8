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
				console.log("this.userInfo.token " + this.userInfo.token)
				if(!this.userInfo.token) {
					// uni.login({
					//     provider: "weixin",
					//     success: (res) => {
					// 		console.log(res)
					// 		// uni.getUserInfo({
					//         //     provider: value,
					//         //     success: (infoRes) => {
					//         //         /**
					//         //          * 实际开发中，获取用户信息后，需要将信息上报至服务端。
					//         //          * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
					//         //          */
					//         //         this.toMain(infoRes.userInfo.nickName);
					//         //     }
					//         // });
					//     },
					//     fail: (err) => {
					//         console.error('授权登录失败：' + JSON.stringify(err));
					//     }
					// });
					
					var getCodeRes = await arequest('/getCode', null, {})
					window.location.href = getCodeRes.data
					
					// var loginRes = await arequest('/mockLogin', {code: ""}, {
					// })
					// var userInfo = loginRes.data
					// userInfo.roles = JSON.parse(userInfo.roles || "[]")
					// userInfo.achievements = JSON.parse(userInfo.achievements || "[]")
					// this.login(userInfo)
				}
				uni.navigateBack();
			}
		},
		onLoad(option) {
			_that = this;
			console.log("code is " + option.code);
			uni.showToast({
				title: option.code
			})
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
		width: 332upx;
		height: 100upx;
		line-height: 100upx;
		margin: 360upx auto 0;
		color: #fff;
		font-size: 16px;
		background: linear-gradient(127deg,rgba(250,114,104,1) 0%,rgba(117,96,249,1) 100%);
		box-shadow: 0px 12upx 20upx 0px rgba(184,105,176,0.54);
		border-radius: 100upx;

	}	
}
</style>
