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
					<text class="num">{{swiperLength}}</text>
				</view>
			</view>
			<view class="billboard-title">
				<button>榜单福利<i class="icon-tip"></i></button>
			</view>
			<view class="section top-3">
				<ul class="billboard-list-top-3">
					<li class="billboard-item" v-for="item in billboardListTop3" :key="item.id" >
						<view class="portrait">
							<image class="img" :src="item.img" >
							<text class="rank">{{item.rank}}</text>
						</view>
						<view class="name">{{item.name}}</view>
						<view class="integral">{{item.integral}}<i class="icon-integral"></i></view>
						<button class="btn-pick" @tap="navToFansPage(item.id)">PICK</button>
					</li>
				</ul>
			</view>
			<view class="section top-others">
				<ul class="billboard-list-others">
					<li class="billboard-item" v-for="item in billboardListOthers" :key="item.id">
						<div class="billboard-item-l">
							<text class="rank">{{item.rank}}</text>
							<image class="img" :src="item.img"></image>
							<view>
								<view class="name">{{item.name}}</view>
								<view class="integral">{{item.integral}}<i class="icon-integral"></i></view>
							</view>
						</div>
						<button class="btn-pick" @tap="navToFansPage(item.id)">PICK</button>
					</li>
				</ul>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				billboardListTop3: [],
				billboardListOthers: []
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			async loadData() {
				// 获取轮播图
				let carouselList = await this.$api.json('carouselList');
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				// 获取榜单
				let billboardList = await this.$api.json('billboardList');
				
				if(billboardList) {
					this.billboardListTop3 = billboardList.slice(0,3);
					this.billboardListOthers = billboardList.slice(3,10);
				}
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			navToFansPage(id) {
				getApp().globalData.billboardId = id;
				uni.switchTab({
					url: "/pages/fans/fans"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('billboard.less');
</style>
