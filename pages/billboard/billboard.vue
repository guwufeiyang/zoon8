<template>
	<view class="container">
		
		<!-- <view class="status_bar">新秀榜单</view> -->
		<view class="content-wrap">
			<image class="header-bg" src="../../static/header-bg.png"></image>
			<view class="search-wrap">
				<view class="search-bg"></view>
				<view class="search-cont">
					<image class="icon-search" src="../../static/icon-search.png"></image>
					<input class="uni-input" placeholder="乐队名称" @focus="goToSearchPage"/>
				</view>
			</view>
			<!-- 头部轮播 -->
			<view class="carousel-section">
				<image class="carousel-shadow" src="../../static/banner-bg.png"></image>
				<swiper class="carousel" circular @change="swiperChange" :autoplay="true" >
					<swiper-item 
						v-for="(img, index) in carouselList" 
						:key="index" 
						class="carousel-item"
						@click="navToDetailPage({title: '轮播广告'})">
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
				<button @click="jumpToWelfare">
					榜单福利
					<image class="icon-tip" src="../../static/icon-tip.png"></image>
				</button>
			</view>
			
			<view class="section top-3" v-if="billboardListTop3 && billboardListTop3.length>0">
				<view class="billboard-list-top-3">
					<view class="billboard-item" v-for="(item, index) in billboardListTop3" :key="index" >
						<image class="portrait-bg" src="../../static/person-bg-s.png"></image>
						<view class="portrait">
							<image class="img" :src="item.logo" ></image>
							<text class="rank">{{item.totalRank.rankValue }}</text>
						</view>
						<view class="name">{{item.name}}</view>
						<view class="integral">
							{{item.totalRank.amount}}
							<image src="../../static/icon-integral.png" class="icon-integral"></image>
						</view>
						<button class="btn-pick" @tap="navToFansPage(item)">PICK</button>
					</view>
				</view>
			</view>
			
			<view class="section top-others">
				<view class="billboard-list-others">
					<view class="billboard-item" v-for="(item, index) in billboardListOthers" :key="index">
						<view class="billboard-item-l">
							<text class="rank">{{item.totalRank.rankValue }}</text>
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
		
		<finish-task ref="finishTaskPop" @closeFinishTaskPop="closeFinishTaskPop"></finish-task>
	</view>
</template>

<script>
	import finishTask from '@/components/finish-task.vue'
	
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'
	import _ from "lodash"
	
	export default {
		components: {
			finishTask
		},
		data() {
			return {
				swiperCurrent: 0,
				carouselList: [],
				billboardListTop3: [],
				billboardListOthers: [],
				timer: 0
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['login', 'setCurrentBand']),
			
			swapArr(arr, index1, index2) {
			    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
			    return arr;
			},
			async loadData() {
				// 获取轮播图
				var bannerRes = await arequest('/banner', null, {})
				this.carouselList = bannerRes.data
				
				// 获取榜单
				var bandsRes = await arequest('/loadBands', null, {})
				var bands = bandsRes.data;

				this.swapArr(bands, 0, 1);
				this.billboardListTop3 = bands.slice(0,3);
				this.billboardListOthers = bands.slice(3,10);
			},
			//轮播图切换
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			goToSearchPage() {
				uni.navigateTo({
					url: "../search/search"
				});
			},
			navToFansPage(item) {
				// 防止高频点击
				if(this.timer == 1) {
					return;
				}
				setTimeout(()=> {
					this.timer = 0;
				}, 500);
				
				if(this.userInfo.bindedBand == item.id) {
					uni.switchTab({
						url: "/pages/fans/fans"
					});
				} else {
					this.setCurrentBand(item.id);
					uni.navigateTo({
						url: "/pages/toBeFans/toBeFans"
					});
				}
			},
			jumpToWelfare() {
				uni.navigateTo({
					url: "../welfare/welfare"
				});
			},
			closeFinishTaskPop() {
				
			}
		},
		onShow() {
			this.loadData();
		},
		onReady() {
			this.$refs.finishTaskPop.openCoupleRegisterPop()
		}
	}
</script>

<style lang="less">
	@import url('billboard.less');
</style>
