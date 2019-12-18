<template>
	<view class="container">
		<view class="status_bar">
			新秀榜单
		</view>
		<view class="content">
			<view class="header-bg"></view>
			<!-- 头部轮播 -->
			<view class="carousel-section">
				<!-- 标题栏和状态栏占位符 -->
				<view class="carousel-shadow"></view>
				<swiper class="carousel" circular @change="swiperChange" :autoplay="true" >
					<swiper-item v-for="(img, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
						<image :src="img" />
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{carouselList.length}}</text>
				</view>
			</view>
			<view class="billboard-title">
				<button>榜单福利<i class="icon-tip"></i></button>
			</view>
			<view class="section top-3">
				<view class="billboard-list-top-3">
					<view class="billboard-item" v-for="item in billboardListTop3" :key="item.rank" >
						<view class="portrait">
							<image class="img" :src="item.logo" >
							<text class="rank">{{item.rank}}</text>
						</view>
						<view class="name">{{item.name}}</view>
						<view class="integral">{{item.integral}}<i class="icon-integral"></i></view>
						<button class="btn-pick" @tap="navToFansPage(item)">PICK</button>
					</view>
				</view>
			</view>
			<view class="section top-others">
				<view class="billboard-list-others">
					<view class="billboard-item" v-for="item in billboardListOthers" :key="item.rank">
						<view class="billboard-item-l">
							<text class="rank">{{item.rank}}</text>
							<image class="img" :src="item.logo"></image>
							<view>
								<view class="name">{{item.name}}</view>
								<view class="integral">{{item.integral}}<i class="icon-integral"></i></view>
							</view>
						</view>
						<button class="btn-pick" @tap="navToFansPage(item)">PICK</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'
	
	export default {
		data() {
			return {
				swiperCurrent: 0,
				carouselList: [],
				billboardListTop3: [],
				billboardListOthers: []
			}
		},
		computed: {
			...mapState(['userInfo', 'bands'])
		},
		methods: {
			...mapMutations(['login', 'setBands']),
			swapArr(arr, index1, index2) {
			    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
			    return arr;
			},
			async loadData() {
				// 获取轮播图
				var bannerRes = await arequest('/banner', null, {})
				this.carouselList = bannerRes.data
				
				// 获取榜单
				var bands = await arequest('/loadBands', null, {})
				this.setBands(bands.data)
				if(bands.data) {
					this.swapArr(bands.data, 0, 1);
					this.billboardListTop3 = bands.data.slice(0,3);
					this.billboardListOthers = bands.data.slice(3,10);
				}
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			navToFansPage(item) {
				uni.navigateTo({
					url: `/pages/billboard/beFans?item=${JSON.stringify(item)}`
				})
			}
		},
		onLoad(option) {
			this.loadData(option);
		}
	}
</script>

<style lang="less">
	@import url('billboard.less');
</style>
