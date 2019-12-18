<template>
	<view class="container">
		<view class="status_bar" :style="{color: statusBarColor}">
			<text v-if="userInfo.bindedBand">{{bandInfo.name}}</text>粉丝团
		</view>
		
		<view class="content" v-if="!userInfo.bindedBand">
			<view class="not-fans-wrap">
				<image class="not-fans-img" src="../../static/not-fans.png"></image>
				<text class="not-fans-text">你还没有加入粉丝团哦 快去榜单选择心仪爱豆加入粉丝团</text>
			</view>
		</view>
		<view class="content" v-if="userInfo.bindedBand">
			<view class="header-bg">
				<view class="header-img"></view>
				<view class="fans-info">
					<image class="portrait" :src="bandInfo.portrait || '/static/missing-face.png'"></image>
					<view class="info-m">
						<view class="username">{{bandInfo.name}}</view>
						<view class="rank-info">
							<view class="rank-info-item">
								<view class="info-val">No.{{bandInfo.rank || '--'}}</view>
								<view class="info-label">当前排名</view>
							</view>
							<view class="integral-info-item">
								<view class="info-val">{{bandInfo.integral}}</view>
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
					<li class="message-item" :class="{active: item.selected === true}" v-for="(item, index) in comments" :key="index" @tap="selectFans(item, index+1)">
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
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'

	import uniStatusBar from '@/components/uni-status-bar.vue'
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				contributeList: [],
				comments: [],
				commentPage: 0,
				commentPageSize: 10
			};
		},
		computed: {
			...mapState(['userInfo', 'bands']),
			statusBarColor() {
				return this.userInfo.bindedBand ? "#fff": "#000"
			}
		},
		methods: {
			...mapMutations(['login', 'setBands']),
			async loadData(option) {
				var bandId = option.bandId || this.userInfo.bindedBand
				if(!this.bands) {
					var bands = await arequest('/loadBands', null, {})
					this.setBands(bands.data)
				}
				if(bandId) {
					this.bandInfo = this.bands.find(function(item){
						return item.id == bandId
					})
					console.log("bandInfo " + bandInfo + " bandId " + bandId)
				}
				
				if(this.userInfo.bindedBand) {
					this.comments = await arequest('/loadComment', {offset: this.commentPage * this.commentPageSize, limit: this.commentPageSize}, {})
					this.comments.forEach(item=>{
						item.selected = false;
					});
					this.comments[0].selected = true;
				}

				// 获取贡献榜
				this.contributeList = await this.$api.json('contributeList');
			},
			selectFans(item, idx) {
				this.bandInfo = item;
				this.comments.forEach(item=>{
					item.selected = false;
				});
				item.selected = true;
				this.bandInfo.rank = idx;
			},
			navBack(){
				uni.navigateBack();
			},
		},
		onLoad(option) {
			this.loadData(option)
		}
		
	}
</script>

<style lang="less">
	@import url('fans.less');
</style>

