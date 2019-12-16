<template>
	<view class="container">
		<view class="status_bar">
			粉丝团
		</view>
		<view class="content">
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
						<button class="btn-join">加入公会</button>
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
				
			<view class="section">
				<ul class="message-list">
					<li class="message-item" :class="{active: item.selected === true}" v-for="(item, index) in fanlist" :key="index" @click="selectFans(item, index+1)">
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
	export default {
		data() {
			return {
				id: getApp().globalData.billboardId,
				
				userInfo: {},
				fanlist: [],
				contributeList: []
			};
		},
		onLoad() {
			// 接收传值,id里面放的是标题，因为测试数据并没写id
			console.log(this.id)
			
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
			}
		}
		
	}
</script>

<style lang="less">
	@import url('fans.less');
</style>

