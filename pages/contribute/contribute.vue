<template>
	<view class="contribute-box">
		<view class="tab-bar">
			<view class="tab" :class="{'active':active===0}" @click="tabSwitch(0)">
				本日
			</view>
			<view class="tab" :class="{'active':active===1}" @click="tabSwitch(1)">
				本周
			</view>
			<view class="tab" :class="{'active':active===2}" @click="tabSwitch(2)">
				历史
			</view>
		</view>
		
		<view class="section contribute-list">
			<view class="contribute-item" v-for="item in contributeList" :key="item.id">
				<view class="item-l">
					<text class="rank">{{item.rank}}</text>
					<image class="img" :src="item.img"></image>
					<view class="name">{{item.name}}</view>
				</view>
				<view class="item-r">
					<view class="integral">{{item.integral}}<i class="icon-integral"></i></view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				contributeList: []
			};
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			tabSwitch(n) {
				this.active = n;
			},
			async loadData() {
				this.contributeList = await this.$api.json('contributeAllList');
			},
		}
	}
</script>

<style lang="less">


.contribute-item {
	width: 100%;
	height: 120upx;
	padding: 0 24upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	.item-l {
		flex: 2;
		display: flex;
		align-items: center;
		.rank {
			display: inline-block;
			line-height: 56upx;
			width: 36upx;
			height: 56upx;
			text-align: center;
		}
		.img {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			margin: 0 20upx 0 25upx;
		}
		.name {
			font-size: 16px;
		}
	}
	.item-r {
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
		font-size: 12px;
		color: #FA6889;
	}
}
</style>
