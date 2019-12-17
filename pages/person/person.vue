<template>
	<view class="container">
		<view class="status_bar">
			个人中心
		</view>
		<view class="content">
			<view class="header-bg"></view>
			<view class="userinfo-box">
				<view class="userinfo-box-top">
					<image class="portrait" src="/static/missing-face.png"></image>
					<view class="userinfo-r">
						<button  class="login-btn" @tap="gotoLogin">登录</button>
						<view class="rank-info">
							<view class="rank-info-item">
								<view class="info-val">--</view>
								<view class="info-label">当前排名</view>
							</view>
							<view class="integral-info-item">
								<view class="info-val">--</view>
								<view class="info-label">本日积分</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="section-list">
				<view class="section notLogin-item" v-for="(item, index) in achievementList" :key="index">
					<image :src="item.img" class="img"></image>
					<view class="section-txt">
						<view class="info-label">{{item.title}}</view>
						<view class="info-value">{{item.desc}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasLogin: false,
				achievementList: []
			};
		},
		onLoad() {
			// 可以根据this.userInfo.token时候有值判断是否已经登录
			this.loadData();
		},
		methods:{
			gotoLogin(){
				uni.navigateTo({
				    url: '../login/login',
				});
			},
			async loadData() {
				// 获取用户成就列表
				this.achievementList = await this.$api.json('achievementList');
			}
		}
	}
</script>

<style lang="less">
	@import url('person.less');
</style>
