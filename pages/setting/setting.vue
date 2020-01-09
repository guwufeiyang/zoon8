<template>
	<view>
		<view class="section setting-box">
			<view class="setting-item" @tap="unbindBand()" v-if="userInfo.bindedBand">
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
		<view class="btn-sign-out" @tap="logout()" v-if="userInfo.id">
			退出登录
		</view>
		
		<!--确认退出弹窗  -->
		<uni-popup ref="showtip" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-content">
					您将退出**的粉丝团
				</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel()">再想想</text>
					<text class="uni-tip-button" @click="confirm()">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'
	import _ from 'lodash'
	
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			unbindBand(){ 
				this.type = 'center';
				this.$nextTick(() => {
					this.$refs.showtip.open();
				});
			},
			async confirm() {
				this.$refs.showtip.close();
				
				await arequest('/unbindBand', {}, {})
				var meRes = await arequest('/me', null, {})
				this.login(meRes.data.me || meRes.data)
				uni.switchTab({
					url: "/pages/billboard/billboard"
				});
			},
			cancel() {
				this.$refs.showtip.close();
			},
			async logout() {
				this.login({})
				uni.switchTab({
					url: "/pages/person/person"
				});
			}
		}
	}
</script>

<style lang="less">
.setting-box {
	margin-top: 20rpx;
}
.setting-item {
	height: 100rpx;
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

.uni-tip {
	width: 640upx;
	height: 310upx;
	background-color: #fff;
	border-radius: 10upx;
}

.uni-tip-title {
	margin-bottom: 10px;
	text-align: center;
	font-weight: bold;
	font-size: 16px;
	color: #333;
}

.uni-tip-content {
	display: flex;
	height: 208upx;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	text-align: center;
	line-height: 42upx;
	color: #656976;
	padding: 0 90rpx;
	border-bottom: 1upx solid #F4F5F7;
}

.uni-tip-group-button {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	height: 100upx;
	line-height: 100upx;
}

.uni-tip-button {
	flex: 1;
	text-align: center;
	font-size: 18px;
	color: #656976;
	&:last-child{
		border-left: 1upx solid #F4F5F7;
		color: #fa6889;
	}
}

</style>
