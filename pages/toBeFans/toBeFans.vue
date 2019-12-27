<template>
	<view class="container">
		<!-- <view class="header-bg"></view> -->
		<!-- <image class="header-img" src="../../static/fans-bg.png"></image> -->
		
		<!-- <view class="status_bar">
			<image class="icon-back" @click="returnBack" src="../../static/icon-back.png"></image>
			<text>{{bandInfo.name}}</text>粉丝团
		</view> -->
		<view class="content-wrap">
			<view class="header-bg"></view>
			<image class="header-img" src="../../static/fans-bg.png"></image>
			<view class="fans-info">
				<image class="portrait" :src="bandInfo.logo || '/static/missing-face.png'"></image>
				<view class="info-m">
					<view class="username">{{bandInfo.name}}</view>
					<view class="rank-info">
						<view class="rank-info-item">
							<view class="info-val">No.{{(bandInfo.totalRank && bandInfo.totalRank.rankValue ) || '--'}}</view>
							<view class="info-label">当前排名</view>
						</view>
						<view class="integral-info-item">
							<view class="info-val">{{(bandInfo.totalRank && bandInfo.totalRank.amount) || "--"}}</view>
							<view class="info-label">累计积分</view>
						</view>
					</view>
				</view>	
				<view class="info-r">
					<button class="btn-join" v-if="!(userInfo.id && userInfo.band && userInfo.band.id)" @click="joinFansGroup()">加入粉丝团</button>
					<button class="btn-join" v-if="userInfo.id && userInfo.band && userInfo.band.id != bandId" @click="steal()">偷积分</button>
				</view>
			</view>	
			
			<view class="contribute-box" @click="gotoContribute()">
				<image class="contribute-box-l" src="../../static/contribute-box-border.png"></image>
				<view class="contribute-box-r-bg"></view>
				<view class="contribute-box-r">
					<view class="label">贡献榜</view>
					<view class="img-list">
						<view class="img-wrap" v-for="(item, index) in contributeList" :key="index">
							<image class="contribute-img" :src="item.avatar"></image>
							<view class="index" :style="{backgroundColor: item.bg}">{{index+1}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="section">
				<view class="message-list" v-if="comments&& comments.length>0">
					<view class="message-item-wrap" :class="{'active': item.id == item.bandId}" v-for="(item, index) in comments" :key="index" >
						<image class="portrait-bg" src="../../static/person-bg-xs.png"></image>
						<view class="message-item" >
							<image class="img" :src="item.fanAvatar"></image>
							<view class="item-right">
								<view class="item-top">
									<text class="name">{{ item.fanName }}</text>
									<text class="time">{{ item.time | formatDate('hh:mm:ss') }}</text>
								</view>
								<view class="message">{{item.content}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="empty-box" v-else>
					<image src="../../static/empty-bg.png" class="empty-img"></image>
					<text class="empty-txt">暂无数据</text>
				</view>
			</view>
		</view>
		
		<!--确认加入弹窗  -->
		<uni-popup ref="showtip" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-content">
					您将加入{{bandInfo.name}}的粉丝团，<br />暂不提供退团功能哦！
				</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel()">再看看</text>
					<text class="uni-tip-button" @click="confirmJoin()">加入</text>
				</view>
			</view>
		</uni-popup>
		
		<!--偷积分弹窗  -->
		<uni-popup ref="stealIntegralPop" :type="type" :mask-click="false">
			<view class="uni-tip uni-confirm-contribute-intergral">
				<image src="../../static/steal-integral.png" class="img"></image>
				<view class="integral">
					偷取5积分
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest, dateFormat } from '../../room8Util.js'

	import uniStatusBar from '@/components/uni-status-bar.vue'
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		components: {
			uniStatusBar,
			uniPopup
		},
		data() {
			return {
				bandId: null, //从上下文中推测出的
				bandInfo: {},

				contributeList: [],
				type: '',
				
				comments: [],
				commentPage: 0,
				commentPageSize: 10
			}
		},
		computed: {
			...mapState(['userInfo', 'currentBand'])
		},
		filters:{
			formatDate(time, format="yyyy.MM.dd") {
				let theTime = new Date(time)
				let today = new Date()
				today.setHours(0)
				today.setMinutes(0)
				today.setSeconds(0)
				if(theTime < today) {
					return dateFormat.formatDate(theTime, "yyyy.MM.dd");
				}
				return dateFormat.formatDate(theTime, format);
			}
		},
		methods: {
			...mapMutations(['login', 'setCurrentBand']),
			async loadFansRank() {
				var getBandContributeRankRes = await arequest('/getBandContributeRank', { id: this.bandId }, {});
				let getBandContributeRank = getBandContributeRankRes.data;
				let colorList = ["#fa6889","#f98c4e", "#eb68fa", "#8b68fa", "#68dffa"];
				
				if(getBandContributeRank && getBandContributeRank.length>0 ) {
					getBandContributeRank.forEach((item, i)=> {
						item.bg = colorList[i];
					});
					this.contributeList = getBandContributeRank;
				}
			},
			async loadData() {
				this.bandId = this.currentBand
				if(this.bandId) {
					var bandsRes = await arequest('/loadBands', null, {})
					this.bands = bandsRes.data
					this.bandInfo = this.bands.find((item)=>{
						return item.id == this.bandId
					})

					// 获取贡献榜
					this.loadFansRank()
					
					// offset: this.commentPage * this.commentPageSize, 
					// limit: this.commentPageSize,
					var commentsRes = await arequest('/loadComment', {
						id: this.bandId, 
					}, {})
					this.comments = commentsRes.data
					
					if(this.comments && this.comments.length > 0) {
						this.comments.forEach(item=>{
							item.time = new Date(item.createTimestamp)
							item.selected = false;
						});
						// this.comments[0].selected = true;
					}
				}
			},
			async steal(){
				var stealRes = await arequest('/steal', { id: this.bandId }, {});

				var bandsRes = await arequest('/loadBands', null, {})
				var bands = bandsRes.data
				this.bandInfo = bands.find((item)=>{
					return item.id == this.bandId
				});
				this.type = 'center';
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.stealIntegralPop.open()
					}, 0);
					setTimeout( ()=> {
						this.$refs.stealIntegralPop.close()
					}, 1500);
				});
			},
			gotoContribute() {
				this.setCurrentBand(this.bandId);
				uni.navigateTo({
					url: "/pages/contribute/contribute"
				})
			},
			returnBack() {
				uni.switchTab({
					url: "/pages/billboard/billboard"
				});
			},
			joinFansGroup() {
				if(this.userInfo.id) {
					this.type = 'center';
					this.$nextTick(() => {
						this.$refs.showtip.open();
					});
				} else {
					uni.navigateTo({
						url: "../login/login"
					})
				}
			},
			cancel() {
				this.$refs.showtip.close();
			},
			async confirmJoin() {
				var bindToBandRes = await arequest('/bindToBand', {
					id: this.bandId
				}, {});
				var meRes = await arequest('/me', null, {})
				this.login(meRes.data.me || meRes.data);

				this.$api.msg("加入粉丝团成功！");
				this.$refs.showtip.close();
			}
		},
		onShow() {
			this.loadData()
		}
	}
</script>

<style lang="less">
	@import url('../fans/fans.less');
	.content-wrap {
		bottom: 0;
	}
	.contribute-box {
		margin-bottom: 20rpx;
	}
</style>


