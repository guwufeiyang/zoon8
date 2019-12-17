<template>
	<view class="container">
		<view class="status_bar">
			<i class="icon-back" @click="navBack"></i>{{userInfo.name}}粉丝团
		</view>
		<view class="content">
			<view class="header-bg">
				<view class="header-img"></view>
				
				<view class="fans-info">
					<image class="portrait" :src="userInfo.img || '/static/missing-face.png'"></image>
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
						<button class="btn-join" @click="joinFansGroup">加入粉丝团</button>
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
							<image class="contribute-img" :src="item.img"></image>
							<view class="index" :style="{backgroundColor: item.bg}">{{index+1}}</view>
						</view>
					</view>
				</view>
			</view>
				
			<view class="section">
				<ul class="message-list">
					<li class="message-item" 
						:class="{'active': item.selected }" 
						v-for="(item, index) in fanlist" 
						:key="index" 
						@click="selectFans(item)">
						<view class="portrait-bg"></view>
						<image class="img" :src="item.portrait"></image>
						<view class="item-right">
							<view class="item-top">
								<text class="name">{{ item.name }}</text>
								<text class="time">{{ item.time }}</text>
							</view>
							<view class="message">{{ item.message }}</view>
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
				// id: getApp().globalData.billboardId,
				userInfo: {},
				fanlist: [],
				contributeList: []
			};
		},
		onLoad(options) {
			// this.userInfo = getApp().globalData.bandInfo;
			this.userInfo = JSON.parse(options.item);
			this.loadData()
		},
		methods: {
			async loadData() {
				// 获取榜单
				this.fanlist = await this.$api.json('fanlist');
				this.fanlist.forEach(item=>{
					item.selected = false;
				});
			
				// 获取贡献榜
				this.contributeList = await this.$api.json('contributeList');
			},
			selectFans(item) {
				this.fanlist.forEach(item=>{
					item.selected = false;
				});
				item.selected = true;
				console.log(this.fanlist);
			},
			navBack(){
				uni.switchTab({
					url: "/pages/billboard/billboard"
				})
			},
			joinFansGroup() {
				uni.showModal({
				    title: '提示',
				    content: '您将加入王一博的粉丝团，暂不提供退团功能哦！',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
		
	}
</script>

<style lang="less">
	@import url('beFans.less');
</style>

