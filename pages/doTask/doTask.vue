<template>
	<view class="container">
		<view class="content-wrap">
			<view class="content-bg1"></view>
			<image class="content-bg2" src="../../static/doTaskBg.png"></image>
			<view class="content">
				<view class="tab-bar">
					<view class="tab" :class="{'active': currentTab==='dailyTask'}" @click="tabSwitch('dailyTask')">每日任务</view>
					<view class="tab" :class="{'active': currentTab==='achievement'}" @click="tabSwitch('achievement')">成就任务</view>
					<!-- <view class="tab" :class="{'active': currentTab==='seasonTask'}" @click="tabSwitch('seasonTask')">赛季任务</view> -->
				</view>
				<view class="tab-content-wrap" v-if="currentTab === 'dailyTask' && isShow ">
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
								<image 
									:src="(task.finished == 1 || task.count < task.threshold) ? '../../static/task-btn-disabled.png' : '../../static/task-btn.png'"
									class="task-btn" 
								>
								</image>
								<view class="task-txt" @tap="manualConfirm(task)">
									{{task.finished == 1 ? '已完成' : task.count < task.threshold ? '未完成' : '领取'}}
								</view>
								<view class="has-finish">
									已完成
									<text class="progress">{{(task.finished == 1 || task.count > task.threshold) ? task.threshold : task.count}}/{{task.threshold}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tab-content-wrap" v-if="currentTab==='achievement' && isShow">
					<view class="task-list" v-for="(achievement, index) in achievements" :key="index">
						<view class="task-bg"></view>
						<view class="task-content">
							<view class="task-l">
								<image class="img" :src="achievement.image"></image>
								<view class="task-con">
									<view class="task-name">{{achievement.name}}</view>
									<view class="task-reward">{{achievement.desc}}</view>
								</view>
							</view>
							<view class="task-r">
								<!--
								<image :src=" achievement.count >= achievement.threshold ? '../../static/task-btn-disabled.png' : '../../static/task-btn.png'"
								 class="task-btn" @tap="goFinish(task)"></image>
								<view class="task-txt" >{{achievement.count >= achievement.threshold ? '已完成' : '去完成'}}</view>
								-->
								<view class="has-finish has-finish-no-btn">
									已完成
									<text class="progress">{{achievement.count > achievement.threshold ? achievement.threshold : achievement.count}}/{{achievement.threshold}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tab-content-wrap" v-if="currentTab==='seasonTask'">
					<view class="task-list">
						<view class="task-bg"></view>
						<view class="task-content">
							敬请期待
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!--偷积分弹窗  -->
		<uni-popup ref="stealIntegralPop" :type="type" :mask-click="false">
			<view class="uni-tip uni-confirm-contribute-intergral">
				<image :class="stealResult == 0 ? 'img-fail' : 'img' "
					:src="stealResult == 0 ? '../../static/steal-integral-fail.png' : '../../static/steal-integral.png'" 
				>
				</image>
				<view :class="stealResult == 0 ? 'integral-fail' : 'integral'">
					stealResult == 0 ? '领取失败' : '偷取{{stealResult}}积分'
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'
	import uniPopup from '@/components/uni-popup.vue'
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				currentTab: 'dailyTask',
				tasks: [],
				isShow: false,
				stealResult: ''
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			async tabSwitch(tab) {
				this.isShow = false
				this.currentTab = tab
				this.loadTabData()
			},
			async reloadMe() {
				var meRes = await arequest('/me', null, {})
				this.login(meRes.data.me || meRes.data)
			},
			goFinish(task){
				// uni.switchTab({
				// 	url: task.gotoUrl
				// })
			},
			async manualConfirm(task){
				// 领取积分弹窗展示
				this.stealResult = task.score;
				this.type = 'center';
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.stealIntegralPop.open()
					}, 0);
					setTimeout( ()=> {
						this.$refs.stealIntegralPop.close()
					}, 1500);
				});
				
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
				if(this.currentTab == 'dailyTask') {
					var loadRes = await arequest('/loadTaskProcessRate?type='+this.currentTab, {}, {})
					this.tasks = loadRes.data
					this.isShow = true
				}
				if(this.currentTab == 'achievement') {
					var loadRes = await arequest('/loadTaskProcessRate?type='+this.currentTab, {}, {})
					this.achievements = loadRes.data
					this.isShow = true
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
