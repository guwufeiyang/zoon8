<template>
	<view>
		<!--新人赠送100积分弹窗  -->
		<view class="popup couple-register-pop" v-if="showCoupleRegisterPop">
			<view class="mask"></view>
			<view class="uni-couple-register-pop">
				<view class="title">新用户赠送100积分</view>
				<image src="../../static/newRegister.png" class="couple-register-bg"></image>
				<button class="btn" @click="closeCoupleRegisterPop()" >我知道了</button>
				<!-- <image class="icon-close" src="../../static/close.png"></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showCoupleRegisterPop: false
			};
		},
		methods:{
			openCoupleRegisterPop() {
				this.showCoupleRegisterPop = true;
			},
			closeCoupleRegisterPop() {
				this.showCoupleRegisterPop = false;
			}
		}
	}
</script>

<style lang="less">
/*  弹出层 */
.popup {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	.mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.uni-couple-register-pop {
		position: absolute;
		top: 200rpx;
		left: 50%;
		margin-left: -239rpx;
		width: 478rpx;
		height: 544rpx;
		background: #fff;
		border-radius: 20rpx;
		z-index: 2;
		border-radius: 10upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.title {
			font-size: 18px;
			height: 132rpx;
			padding-top: 20rpx;
			line-height: 122rpx;
			color: #FA6889;
		}
		.couple-register-bg {
			width: 374upx;
			height: 268upx;
		}
		.icon-close {
			position: absolute;
			bottom: -130rpx;
			left: 50%;
			width: 72rpx;
			height: 130rpx;
			margin-left: -36rpx;
			z-index: 1;
		}
		.btn {
			width: 300rpx;
			height: 66rpx;
			line-height: 66rpx;
			margin: 20rpx auto;
			color: #fff;
			font-size: 12px;
			background: rgba(250,104,137,1);
			box-shadow: 0px 2px 9px 0px rgba(250,104,137,0.6);
			border-radius: 32rpx;
		}
	}
}
</style>
