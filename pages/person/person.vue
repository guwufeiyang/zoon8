<template>
	<view class="container">
		<!-- <image class="header-bg" src="../../static/header-bg.png"></image>
		<view class="status_bar">个人中心</view> -->
		<view class="content-wrap">
			<image class="header-bg" src="../../static/header-bg.png"></image>
			<view class="userinfo-box">
				<image src="../../static/person-info-bg.png" class="box-bg"></image>
				<view class="userinfo-box-top">
					<image class="portrait" v-bind:src='userInfo.avatar || "/static/missing-face.png"'></image>
					<view class="userinfo-r">
						<view class="userinfo-top">
							<view class="login-name" v-if="!userInfo.id" @tap="gotoLogin">点我登录</view>
							<view class="login-name" v-if="userInfo.id">
								{{userInfo.name}}
								<text class="setting-area" {{userInfo.band && userInfo.band.name}}></text>
							</view>
							
				
							<image @click="toSetting" src="../../static/icon-setting.png" class="icon-settings"></image>
							
						</view>
						<view class="rank-info">
							<view class="rank-info-item">
								<view class="info-val">{{userInfo.amount == null ? '--' : userInfo.amount}}</view>
								<view class="info-label">积分余额</view>
							</view>
							<view class="rank-info-item">
								<view class="info-val">{{(userInfo.totalRank && (userInfo.totalRank.rankValue)) || '--'}}</view>
								<view class="info-label">贡献排名</view>
							</view>
							<view class="integral-info-item">
								<view class="info-val">{{userInfo.totalRank && userInfo.totalRank.amount || '--'}}</view>
								<view class="info-label">贡献积分</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="section-list">
				<view 
					class="section notLogin-item" 
					:class="{'disabled': item.sortHint == 0}" 
					v-for="(item, index) in orderedGains"
					:key="index">
					<image :src="item.image" class="img"></image>
					<view class="section-txt">
						<view class="info-label">{{item.name}}</view>
						<view class="info-value">{{item.desc}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<couple-register ref="coupleRegisterPop"></couple-register>
	</view>
</template>

<script>
	import {mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'
	import _ from "lodash"
	import CoupleRegister from '../../components/couple-register.vue'
	export default {
		components: {
			CoupleRegister
		},
		data() {
			return {
				doingLoginCallback: false,
				orderedGains: []
			};
		},
		computed: {
			...mapState(['userInfo', 'gains'])
		},
		methods: {
			...mapMutations(['login']),
			gotoLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			toSetting() {
				uni.navigateTo({
					url: '../setting/setting',
				});
			},
			async loadData(option) {
				if (option.code) { // from callback
					this.doingLoginCallback = true
					var loginRes = await arequest('/wechatLogin', {
						code: option.code,
						state: option.state
					}, {})
					this.login(loginRes.data);
					
					if(loginRes.data.newFan) {
						this.$refs.coupleRegisterPop.openCoupleRegisterPop();
					}
					uni.reLaunch({
						url: '../person/person'
					});
				}
			},
			async reloadUserInfo() {
				if(!this.doingLoginCallback) {
					var meRes = await arequest('/me', null, {})
					this.login(meRes.data.me || meRes.data)
				}
			}
		},
		onShow() {
			this.reloadUserInfo()

			this.orderedGains = this.gains
			if(this.userInfo.achievements && this.userInfo.achievements.length > 0) {
				this.orderedGains = _.map(this.gains, gain=>{
					return {
						...gain,
						sortHint: this.userInfo.achievements.includes(gain.id) ? 1 : 0
					}
				}).sort((gain1, gain2)=>{
					return gain2.sortHint - gain1.sortHint
				})
			}
		},
		onLoad(option) {
			this.loadData(option);
		}
	}
</script>

<style lang="less">
	@import url('person.less');
</style>
