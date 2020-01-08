<template>
	<view>
		<view class="search-cont">
			<image class="icon-search" src="../../static/icon-search1.png"></image>
			<input v-model="keyword" class="uni-input" placeholder="" focus />
		</view>

		<view class="section top-others" v-if="searchList.length > 0">
			<view class="billboard-list-others">
				<view class="billboard-item" v-for="(item, index) in searchList" :key="index">
					<view class="billboard-item-l">
						<image class="img" :src="item.logo"></image>
						<view>
							<view class="name">{{item.name}}</view>
							<view class="integral">
								{{item.totalRank.amount}}
								<image src="../../static/icon-integral.png" class="icon-integral"></image>
							</view>
						</view>
					</view>
					<button class="btn-pick" @tap="navToFansPage(item)">PICK</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'
	import _ from 'lodash'

	export default {
		data() {
			return {
				searchList: [],
				keyword: ''
			};
		},
		watch: {
			keyword(newValue, oldValue) {
				if (!this.keyword) {
					this.searchList = [];
					return;
				}
				this.searchBand()
				// this.debouncedSearchBand()
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		created() {
			this.debouncedSearchBand = _.debounce(this.searchBand, 200)
		},
		methods: {
			...mapMutations(['setCurrentBand']),
			async searchBand() {
				var res = await arequest('/searchBand?band=' + this.keyword, null, {})
				this.$nextTick(() => {
					this.searchList = res.data || []
				});
			},
			navToFansPage(item) {
				if(this.userInfo.bindedBand == item.id) {
					uni.switchTab({
						url: "/pages/fans/fans"
					});
				} else {
					this.setCurrentBand(item.id);
					uni.navigateTo({
						url: "../toBeFans/toBeFans"
					});
				}
			},
		},
		onShow() {}
	}
</script>

<style lang="less">
	.search-cont {
		width: 690rpx;
		height: 72rpx;
		background: #fff;
		margin: 20rpx auto;
		border-radius: 10upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.icon-search {
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		margin: 0 12rpx 0 24rpx;
	}

	.uni-input {
		flex: 1;
		height: 72rpx;
		color: #414348;
		font-size: 16px;

		.uni-input-placeholder {
			color: #414348;
		}
	}

	.btn-pick {
		width: 120upx;
		height: 50upx;
		background: linear-gradient(127deg, rgba(250, 114, 104, 1) 0%, rgba(117, 96, 249, 1) 100%);
		box-shadow: 0upx 4upx 12upx 0px rgba(184, 105, 176, 0.54);
		border-radius: 30upx;
		font-size: 12px;
		color: #fff;
		line-height: 50upx;
		text-align: center;
	}

	.billboard-list-others {
		.billboard-item {
			.img {
				width: 80upx;
				height: 80upx;
				margin: 0 22upx 0 0;
				border-radius: 50%;
			}
		}
	}

	.billboard-list-others {
		padding: 0;
	}
</style>
