<template>
	<view>
		<view class="section setting-box">
			<view class="setting-item" >
				<view class="setting-left">
					<image src="../../static/icon-setting.png" class="setting-icon"></image>
					退出粉丝团
				</view>
				<image class="icon-arrow" src="../../static/icon-arrow-right.png"></image>
			</view>
			<view class="setting-item" >
				<view class="setting-left">
					<image src="../../static/icon-tip1.png" class="setting-icon"></image>
					关于我们
				</view>
				<image class="icon-arrow" src="../../static/icon-arrow-right.png"></image>
			</view>
		</view>
		<view class="btn-sign-out">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.setting-box {
	margin-top: 20rpx;
}
.setting-item {
	height: 88rpx;
	padding: 0 32rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.setting-left {
	display: flex;
	align-items: center;
	font-size: 14px;
	color: #414348;
}
.setting-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: 10rpx;
}
.icon-arrow {
	width: 20rpx;
	height: 20rpx;
}
.btn-sign-out {
	position: absolute;
	bottom: 30%;
	left: 50%;
	margin-left: -220rpx;
	width: 440rpx;
	height: 96rpx;
	background: #fff;
	border-radius: 10rpx;
	text-align: center;
	line-height: 96rpx;
	font-size: 16px;
	color: #FA6889;
}
</style>
