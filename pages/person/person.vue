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
						<view class="login-status">登录</view>
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
			
			<ul class="section-list" v-if="!hasLogin">
				<li class="section notLogin-item">
					<image src="../../static/icon-music.png" class="img"></image>
					<view class="section-txt">
						<view class="info-label">音乐达人</view>
						<view class="info-value">成就详情成就详情</view>
					</view>
				</li>
				<li class="section notLogin-item">
					<image src="../../static/icon-fans.png" class="img"></image>
					<view class="section-txt">
						<view class="info-label">狂热粉丝</view>
						<view class="info-value">成就详情成就详情</view>
					</view>
				</li>
				<li class="section notLogin-item">
					<image src="../../static/icon-achievement.png" class="img"></image>
					<view class="section-txt">
						<view class="info-label">挥金如图</view>
						<view class="info-value">成就详情成就详情</view>
					</view>
				</li>
			</ul>
			
			<ul class="section hasLogin-item-box" v-if="hasLogin">
				<li class="hasLogin-item">
					<image src="../../static/icon-order.png" class="img"></image>
					<view class="text">我的订单</view>
					<view class="icon-arrow-right"></view>
				</li>
				<li class="hasLogin-item">
					<image src="../../static/icon-wallet.png" class="img"></image>
					<view class="text">我的钱包</view>
					<view class="icon-arrow-right"></view>
				</li>
				<li class="hasLogin-item">
					<image src="../../static/icon-order.png" class="img"></image>
					<view class="text">用户手册</view>
					<view class="icon-arrow-right"></view>
				</li>
			</ul>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasLogin: false
			};
		}
	}
</script>

<style lang="less">
	@import url('person.less');
</style>
