<template>
	<view class="container">
		<image class="header-bg" src="../../static/header-bg.png"></image>
		<view class="status_bar">个人中心</view>
		
		<view class="content-wrap">
			<view class="userinfo-box">
				<image src="../../static/person-info-bg.png" class="box-bg"></image>
				<view class="userinfo-box-top">
					<image class="portrait" v-bind:src='userInfo.avatar || "/static/missing-face.png"'></image>
					<view class="userinfo-r">
						<button class="login-btn" v-if="!userInfo.token" @tap="gotoLogin">登录</button>
						<view  class="login-name" v-if="userInfo.token">{{userInfo.name}}</view>
						<view class="rank-info">
							<view class="rank-info-item">
								<view class="info-val">{{userInfo.rank || '--'}}</view>
								<view class="info-label">当前排名</view>
							</view>
							<view class="integral-info-item">
								<view class="info-val">{{userInfo.amountToday || '--'}}</view>
								<view class="info-label">本日积分</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="section-list">
				<view class="section notLogin-item" :class="{'disabled': (userInfo.achievements || []).includes(item.id)}" v-for="(item, index) in achievementList" :key="index">
					<image :src="item.image" class="img"></image>
					<view class="section-txt">
						<view class="info-label">{{item.name}}</view>
						<view class="info-value">{{item.desc}}</view>
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
				hasLogin: false,
				achievementList: []
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad() {
			this.loadData();
		},
		methods:{
			gotoLogin(){
				uni.navigateTo({
				    url: '../login/login',
				});
			},
			async loadData() {
				// this.achievementList = await this.$api.json('achievementList');
				let loadAllGainsRes = await arequest('/loadAllGains', null, {})
				this.achievementList = loadAllGainsRes.data
			}
		}
	}
</script>

<style lang="less">
	@import url('person.less');
</style>
