<template>
	<view class="contribute-box">
		<!--
		<view class="tab-bar">
			<view class="tab" :class="{'active': rankType==='Daily'}" @click="tabSwitch('Daily')">
				本日
			</view>
			<view class="tab" :class="{'active': rankType==='Weekly'}" @click="tabSwitch('Weekly')">
				本周
			</view>
			<view class="tab" :class="{'active': rankType==='Total'}" @click="tabSwitch('Total')">
				历史
			</view>
		</view>
		-->
		<mescroll-uni :fixed="false" :down="downOption" :up="upOption" @down="downCommentCallback" @up="upCommentCallback">
			<view class="section contribute-list" v-if="rank.length > 0">
				<view class="contribute-item" v-for="item in rank" :key="item.id">
					<view class="item-l">
						<image class="rank-img" v-if="item.totalRank.rankValue === 1 " src="../../static/icon-rank-1.png"></image>
						<image class="rank-img" v-if="item.totalRank.rankValue === 2 " src="../../static/icon-rank-2.png"></image>
						<image class="rank-img" v-if="item.totalRank.rankValue === 3 " src="../../static/icon-rank-3.png"></image>
						<text class="rank" v-if="item.totalRank.rankValue > 3 ">{{item.totalRank.rankValue}}</text>
						
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
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		arequest
	} from '../../room8Util.js'
	import MescrollUni from "mescroll-uni"

	export default {
		components: {
			MescrollUni,
		},
		data() {
			return {
				rankType: "Total",
				rank: [],
				downOption: {
					use: true,
					auto: true,
				},
				upOption: {
					use: true,
					auto: false,
					page: {
						num: 0,
						size: 10
					},
					noMoreSize: 5,
					empty: {
						use: false,
						// tip: '暂无相关数据'
					}
				}
			};
		},
		computed: {
			...mapState(['currentBand'])
		},
		methods: {
			tabSwitch(rankType) {
				this.rankType = rankType;
			},
			downCommentCallback(mescroll) {
				this.rank = []
				mescroll.resetUpScroll()
			},
			upCommentCallback(mescroll) {
				this.loadFanRank(mescroll)
			},
			async loadFanRank(mescroll) {
				let offset = (mescroll.num - 1) * mescroll.size
				let limit = mescroll.size
				let fanRankRes = await arequest('/getBandContributeRank?offset=' + offset + '&limit=' + limit + '&rankType=' + this.rankType, {
						id: this.currentBand
					}, {});
				var contributePage = fanRankRes.data

				mescroll.endSuccess(contributePage.list.length, contributePage.total > contributePage.offset + contributePage.limit);
				this.rank = this.rank.concat(contributePage.list)
			},
		}
	}
</script>

<style lang="less">
	.contribute-box {
		padding-top: 20rpx;
		height: 100%;
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
			.rank-img {
				width: 38rpx;
				height: 55rpx;
			}
			.rank {
				display: inline-block;
				line-height: 56upx;
				width: 38upx;
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
