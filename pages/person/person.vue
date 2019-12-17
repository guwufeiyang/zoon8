<template>
	<view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="gotoLogin">登录</button>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			gotoLogin(){
				uni.reLaunch({
				    url: '../login/login',
				});
			}
		}
	}
</script>

<style lang="less">

</style>
