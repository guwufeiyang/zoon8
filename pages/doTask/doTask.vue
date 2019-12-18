<template>
	<view>
		<view class="status_bar">
			<image class="icon-back" @click="returnBack" src="../../static/icon-back.png"></image>
			做任务
		</view>
		<view class="content-bg1"></view>
		<image class="content-bg2" src="../../static/doTaskBg.png"></image>
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
						<button class="btn-pick">领取</button>
						<text class="has-finish">已完成<text class="progress">1/1</text></text>
					</view>
				</view>
			</view>
			<view class="task-list">
				<view class="task-bg"></view>
				<view class="task-content">
					<view class="task-l">
						<image class="img" src="../../static/icon-share.png"></image>
						<view class="task-con">
							<view class="task-name">分享3次</view>
							<view class="task-reward">+100积分</view>
						</view>
					</view>
					<view class="task-r">
						<button class="btn-pick" disabled="true">待完成</button>
						<text class="has-finish">已完成<text class="progress">1/3</text></text>
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
						<button class="btn-pick" disabled="true">已完成</button>
						<text class="has-finish">已完成<text class="progress">1/1</text></text>
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
				active: 0
			};
		},
		methods: {
			returnBack() {
				uni.navigateBack();	
			},
			tabSwitch(n) {
				this.active = n;
			}
		}
	}
</script>

<style lang="less">
	@import url('doTask.less');
</style>
