<template>
	<view class="container">
		<view class="content-bg1"></view>
		<image class="content-bg2" src="../../static/doTaskBg.png"></image>
		
		<view class="status_bar">
			<image class="icon-back" @click="returnBack" src="../../static/icon-back.png"></image>
			做任务
		</view>
		<view class="content-wrap">
			<view class="content">
				<view class="tab-bar">
					<view class="tab" :class="{'active':active===0}" @click="tabSwitch(0)">每日任务</view>
					<view class="tab" :class="{'active':active===1}" @click="tabSwitch(1)">成就任务</view>
					<view class="tab" :class="{'active':active===2}" @click="tabSwitch(2)">赛季任务</view>
				</view>
				
				<view class="task-list">
					<view class="task-bg"></view>
					<view class="task-content">
						<view class="task-l">
							<image class="img" src="../../static/icon-sign.png"></image>
							<view class="task-con">
								<view class="task-name">签到</view>
								<view class="task-reward">+10积分</view>
							</view>
						</view>
						<view class="task-r">
							<image src="../../static/task-btn.png" v-if="!userInfo.dailySign" class="task-btn" @tap="sign"></image>
							<image src="../../static/task-btn-disabled.png" v-if="userInfo.dailySign"  class="task-btn"></image>
							<view class="task-txt" >{{userInfo.dailySign ? '已完成' : '领取'}}</view>
							<view class="has-finish">
								已完成
								<text class="progress">{{userInfo.dailySign ? "1" : "0" }}/1</text>
							</view>
						</view>
					</view>
				</view>
			
				<view class="task-list">
					<view class="task-bg"></view>
					<view class="task-content">
						<view class="task-l">
							<image class="img" src="../../static/icon-share.png"></image>
							<view class="task-con">
								<view class="task-name">分享{{userInfo.shareTimes}}次</view>
								<view class="task-reward">+100积分</view>
							</view>
						</view>
						<view class="task-r">
							<image src="../../static/task-btn.png" v-if="userInfo.dailyShareCount < userInfo.shareTimes" class="task-btn"></image>
							<image src="../../static/task-btn-disabled.png" v-if="userInfo.dailyShareCount >= userInfo.shareTimes"  class="task-btn"></image>
							<view class="task-txt"> {{userInfo.dailyShareCount >= userInfo.shareTimes ? '已完成' : '待完成'}} </view>
							<view class="has-finish">
								已完成
								<text class="progress">{{userInfo.dailyShareCount}}/{{userInfo.shareTimes}}</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="task-list">
					<view class="task-bg"></view>
					<view class="task-content">
						<view class="task-l">
							<image class="img" src="../../static/icon-login.png"></image>
							<view class="task-con">
								<view class="task-name">登录</view>
								<view class="task-reward">+10积分</view>
							</view>
						</view>
						<view class="task-r">
							<image src="../../static/task-btn.png" v-if="!userInfo.dailyLogin" class="task-btn"></image>
							<image src="../../static/task-btn-disabled.png" v-if="userInfo.dailyLogin" class="task-btn"></image>
							<view class="task-txt">已完成</view>
							<view class="has-finish">已完成<text class="progress">1/1</text></view>
						</view>
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
				active: 0
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			returnBack() {
				uni.navigateBack();	
			},
			tabSwitch(n) {
				this.active = n;
			},
			async sign(){
				var signRes = await arequest('/sign', {}, {})
				
				var meRes = await arequest('/me', null, {})
				this.login(meRes.data)
			}
		}
	}
</script>

<style lang="less">
	@import url('doTask.less');
</style>
