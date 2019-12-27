<template>
	<view class="container">
		<!-- <view class="status_bar">
			<image class="icon-back" @click="returnBack" src="../../static/icon-back.png"></image>
			做任务
		</view> -->
		<view class="content-wrap">
			<view class="content-bg1"></view>
			<image class="content-bg2" src="../../static/doTaskBg.png"></image>
			<view class="content">
				<view class="tab-bar">
					<view class="tab" :class="{'active': currentTab==='dailyTask'}" @click="tabSwitch('dailyTask')">每日任务</view>
					<view class="tab" :class="{'active': currentTab==='achievement'}" @click="tabSwitch('achievement')">成就任务</view>
					<view class="tab" :class="{'active': currentTab==='seasonTask'}" @click="tabSwitch('seasonTask')">赛季任务</view>
				</view>
				<view class="tab-content-wrap" v-if="currentTab==='dailyTask'">
					<view class="task-list" v-for="(task, index) in tasks" :key="index">
						<view class="task-bg"></view>
						<view class="task-content">
							<view class="task-l">
								<image class="img" :src="task.image"></image>
								<view class="task-con">
									<view class="task-name">{{task.vName}}</view>
									<view class="task-reward">+{{task.score}}积分</view>
								</view>
							</view>
							<view class="task-r">
								<image :src="(task.finished == 1 || task.count < task.threshold) ? '../../static/task-btn-disabled.png' : '../../static/task-btn.png'"
									class="task-btn" @tap="manualConfirm(task)"></image>
								<view class="task-txt" >{{task.finished == 1 ? '已完成' : task.count < task.threshold ? '未完成' : '领取'}}</view>
								<view class="has-finish">
									已完成
									<text class="progress">{{task.count}}/{{task.threshold}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tab-content-wrap" v-if="currentTab==='achievement'">
					<view class="task-list" v-for="(task, index) in tasks" :key="index">
						<view class="task-bg"></view>
						<view class="task-content">
							<view class="task-l">
								<image class="img" :src="task.image"></image>
								<view class="task-con">
									<view class="task-name">{{task.name}}</view>
									<view class="task-reward">{{task.desc}}</view>
								</view>
							</view>
							<view class="task-r">
								<!--
								<image :src=" task.count >= task.threshold ? '../../static/task-btn-disabled.png' : '../../static/task-btn.png'"
								 class="task-btn" @tap="goFinish(task)"></image>
								<view class="task-txt" >{{task.count >= task.threshold ? '已完成' : '去完成'}}</view>
								-->
								<view class="has-finish">
									已完成
									<text class="progress">{{task.count}}/{{task.threshold}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tab-content-wrap" v-if="currentTab==='seasonTask'">
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
								<template>
									<image src="../../static/task-btn-disabled.png" v-if="userInfo.dailyShareCount >= userInfo.shareTimes"  class="task-btn"></image>
									<image src="../../static/task-btn.png" v-else class="task-btn"></image>
								</template>
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
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'

	export default {
		data() {
			return {
				currentTab: 'dailyTask',
				tasks: []
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
			tabSwitch(tab) {
				this.currentTab = tab

				this.loadTabData()
			},
			async reloadMe() {
				var meRes = await arequest('/me', null, {})
				this.login(meRes.data.me || meRes.data)
			},
			async goFinish(task){
				// uni.switchTab({
				// 	url: task.gotoUrl
				// })
			},
			async manualConfirm(task){
				if(task.count < task.threshold) {
					// uni.switchTab({
					// 	url: task.gotoUrl
					// })
				} else {
					var signRes = await arequest('/manualConfirm?task='+task.name, {}, {})
					this.loadTabData()
				}
			},
			async loadTabData() {
				await this.reloadMe()
				
				if(this.currentTab == 'dailyTask' ||　this.currentTab == 'achievement') {
					var loadRes = await arequest('/loadTaskProcessRate?type='+this.currentTab, {}, {})
					this.tasks = loadRes.data
				}
			}
		},
		onShow() {
			this.loadTabData()
		}
	}
</script>

<style lang="less">
	@import url('doTask.less');
</style>
