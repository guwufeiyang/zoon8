<template>
	<view class="finish-task">
		<!--新人赠送100积分弹窗  -->
		<view class="popup finish-task-pop" v-if="showFinishTaskPop">
			<view class="mask"></view>
			<view class="uni-finish-task-pop">
				<view class="title">
					<view class="line"></view>
					<text class="txt">完成任务</text>
				</view>
				<image src="../../static/icon-sign.png" class="couple-register-bg"></image>
				<view class="content1">签到</view>
				<view class="content2">
					+ 10积分
					<image class="icon-integral" src="../../static/icon-integral.png"></image>
				</view>
				<button class="btn">领取奖励</button>
				<image class="icon-close" src="../../static/close.png" @click="closePop()"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showFinishTaskPop: false
			};
		},
		methods:{
			openCoupleRegisterPop() {
				this.showFinishTaskPop = true;
			},
			closePop() {
				this.showFinishTaskPop = false;
				// this.$emit("closeFinishTaskPop");
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
	.uni-finish-task-pop {
		position: absolute;
		top:  20%;
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
			position: relative;
			width: 368rpx;
			height: 96rpx;
			font-size: 14px;
			text-align: center;
			line-height: 96rpx;
			color: #95989C;
			.line {
				width: 100%;
				height: 1rpx;
				background: #c8c7cc;
				position: absolute;
				top: 52rpx;
			}
			.txt {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				background: #fff;
				padding: 0 20rpx;
			}
		}
		.couple-register-bg {
			width: 168upx;
			height: 168upx;
		}
		.content1 {
			height: 66rpx;
			line-height: 66rpx;
			margin-top: 20rpx;
			color: #414348;
			font-size: 18px;
		}
		.content2 {
			height: 48rpx;
			line-height: 48rpx;
			margin-bottom: 10rpx;
			color: #FA6889;
			font-size: 14px;
		}
		.icon-close {
			position: absolute;
			bottom: -120rpx;
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

