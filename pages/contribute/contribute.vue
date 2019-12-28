<template>
	<view class="contribute-box">
		<!--
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
		-->
		<view class="section contribute-list" v-if="contributeList && contributeList.length>0" >
			<view class="contribute-item" 
				v-for="item in contributeList" 
				:key="item.id">
				<view class="item-l">
					<text class="rank">{{item.totalRank.rankValue }}</text>
					<image class="img" :src="item.avatar"></image>
					<view class="name">{{item.name}}</view>
				</view>
				<view class="item-r">
					<view class="integral">
						{{item.totalRank.amount}}
						<image class="icon-integral" src="../../static/icon-integral.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="empty-box" v-else>
			<image src="../../static/empty-bg.png" class="empty-img"></image>
			<text class="empty-txt">暂无数据</text>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'
	export default {
		data() {
			return {
				active: 0,
				contributeList: []
			};
		},
		computed: {
			...mapState(['currentBand'])
		},
		methods: {
			tabSwitch(n) {
				this.active = n;
			},
			async loadData() {
				var rankType = "" // this.active
				let fanRankRes = await arequest('/getBandContributeRank?rankType='+rankType, { id: this.currentBand }, {});
				this.contributeList = fanRankRes.data.list
			},
		},
		onLoad() {
			this.loadData();
		}
	}
</script>

<style lang="less">
.contribute-box {
	padding-top: 20rpx;
}
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
