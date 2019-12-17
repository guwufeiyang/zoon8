<template>
	<view class="container">
		<view class="status_bar" :style="{color: statusBarColor}">
			<text v-if="isFans">{{userInfo.name}}</text>粉丝团
		</view>
		
		<view class="content" v-if="!isFans">
			<view class="not-fans-wrap">
				<image class="not-fans-img" src="../../static/not-fans.png"></image>
				<text class="not-fans-text">你还没有加入粉丝团哦 快去榜单选择心仪爱豆加入粉丝团</text>
				<button class="btn-red">登录查看粉丝团</button>
			</view>
		</view>
		<view class="content" v-if="isFans">
			<view class="header-bg">
				<view class="header-img"></view>
				<view class="fans-info">
					<image class="portrait" :src="userInfo.portrait || '/static/missing-face.png'"></image>
					<view class="info-m">
						<view class="username">{{userInfo.name}}</view>
						<view class="rank-info">
							<view class="rank-info-item">
								<view class="info-val">No.{{userInfo.rank}}</view>
								<view class="info-label">当前排名</view>
							</view>
							<view class="integral-info-item">
								<view class="info-val">{{userInfo.integral}}</view>
								<view class="info-label">本日积分</view>
							</view>
						</view>
					</view>
					<view class="info-r">
						<button class="btn-join">加入粉丝团</button>
					</view>
				</view>
			</view>	
			
			<view class="contribute-box">
				<view class="contribute-box-l"></view>
				<view class="contribute-box-r-bg"></view>
				<view class="contribute-box-r">
					<view class="label">贡献榜</view>
					<view class="img-list">
						<view class="img-wrap" v-for="(item,index) in contributeList" :key="index">
							<image class="contribute-img"  :src="item.img"></image>
							<view class="index" :style="{backgroundColor: item.bg}">{{index+1}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="task-box">
				<view class="task-item">
					<image class="task-img" src="../../static/icon-task.png"></image>
					<text class="task-txt">做任务</text>
				</view>
				<view class="task-item">
					<image class="task-img" src="../../static/icon-message.png"></image>
					<text class="task-txt">发留言</text>
				</view>
				<view class="task-item">
					<image class="task-img" src="../../static/icon-lottery.png"></image>
					<text class="task-txt">去抽奖</text>
				</view>
			</view>
				
			<view class="section">
				<ul class="message-list">
					<li class="message-item" :class="{active: item.selected === true}" v-for="(item, index) in fanlist" :key="index" @tap="selectFans(item, index+1)">
						<view class="portrait-bg"></view>
						<image class="img" :src="item.portrait"></image>
						<view class="item-right">
							<view class="item-top">
								<text class="name">{{ item.name }}</text>
								<text class="time">{{ item.time }}</text>
							</view>
							<view class="message">{{item.message}}</view>
						</view>
					</li>
				</ul>
			</view>
		</view>
		
		
	</view>
</template>


<script>
	import uniStatusBar from '@/components/uni-status-bar.vue'
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				// id: getApp().globalData.billboardId,
				isFans: false,
				userInfo: {},
				fanlist: [],
				contributeList: []
			};
		},
		computed: {
			statusBarColor() {
				return this.isFans ? "#fff": "#000"
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			async loadData() {
				// 获取榜单
				let fanlist = await this.$api.json('fanlist');	
				this.fanlist = fanlist;
				this.fanlist.forEach(item=>{
					item.selected = false;
				});
				this.fanlist[0].selected = true;
				this.userInfo = this.fanlist[0];
				this.userInfo.rank = 1;
				// 获取贡献榜
				this.contributeList = await this.$api.json('contributeList');
			},
			selectFans(item, idx) {
				this.userInfo = item;
				this.fanlist.forEach(item=>{
					item.selected = false;
				});
				item.selected = true;
				this.userInfo.rank = idx;
			},
			navBack(){
				uni.navigateBack();
			},
		}
		
	}
</script>

<style lang="less">
	@import url('fans.less');
</style>

