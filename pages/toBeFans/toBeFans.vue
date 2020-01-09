<template>
	<view class="container">
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
					<button class="btn-join" 
						v-if="!(userInfo.id && userInfo.band && userInfo.band.id)" 
						@click="joinFansGroup()">
						加入粉丝团
					</button>
					<button class="btn-join" 
						v-if="userInfo.id && userInfo.band && userInfo.band.id != bandId" 
						:disabled="stealedBand.includes(bandId) || (bandInfo.totalRank && bandInfo.totalRank.amount == 0)" 
						:class="{ 'disabled': stealedBand.includes(bandId) || (bandInfo.totalRank && bandInfo.totalRank.amount == 0) }"
						@click="steal()">
						{{stealedBand.includes(bandId) ? '已偷取' : (bandInfo.totalRank && bandInfo.totalRank.amount == 0) ? "无积分" : '偷积分' }}
						<image src="../../static/icon-contribute-intergral.png" class="icon-integral"></image>
					</button>
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
							<view class="index" :style="{backgroundColor: colorList[index]}">{{index+1}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="section">
				<view class="message-list" v-if="commentPage.list.length>0" >
					<view class="message-item-wrap" 
						:class="{'active': item.id == item.bandId}" 
						v-for="(item, index) in commentPage.list" 
						:key="index" >
						<image class="portrait-bg" src="../../static/person-bg-xs.png"></image>
						<view class="message-item" >
							<image class="img" :src="item.fanAvatar"></image>
							<view class="item-right">
								<view class="item-top">
									<text class="name">{{ item.fanName }}</text>
									<text class="time">{{ item.createTimestamp | formatDate }}</text>
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
				<image :class="stealResult == 0 ? 'img-fail' : 'img' "
					:src="stealResult == 0 ? '../../static/steal-integral-fail.png' : '../../static/steal-integral.png'" 
				>
				</image>
				<view :class="stealResult==0 ? 'integral-fail' : 'integral'">
					{{stealResult == 0 ? '领取失败' : '偷取{{stealResult}}积分'}}
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import moment from "moment"
	import { arequest } from '../../room8Util.js'
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				bandId: null, //从上下文中推测出的
				bandInfo: {},

				contributeList: [],
				type: '',
								
				commentPage: {
					offset: 0,
					limit: 10,
					total: 0,
					list: []
				},
				
				stealResult: 0,
				colorList: ["#fa6889","#f98c4e", "#eb68fa", "#8b68fa", "#68dffa"]
			}
		},
		computed: {
			...mapState(['userInfo', 'stealedBand', 'currentBand'])
		},
		filters:{
			formatDate(time, format="YYYY.MM.DD") {
				let theTime = new Date(time)
				let today = new Date()
				today.setHours(0)
				today.setMinutes(0)
				today.setSeconds(0)
				if(theTime < today) {
					return moment(theTime).format('YYYY.MM.DD')
				}
				return moment(theTime).format('HH:mm:ss')
			}
		},
		methods: {
			...mapMutations(['login', 'addToStealedBand', 'setCurrentBand']),
			async reloadComment() {
				var commentsRes = await arequest('/loadComment?offset=' + this.commentPage.offset + '&limit=' + this.commentPage.limit, {
					id: this.bandId
				}, {})
				this.commentPage = commentsRes.data;
			},
			async loadFansRank() {
				var getBandContributeRankRes = await arequest('/getBandContributeRank', { 
					id: this.bandId,
				}, {});
				this.contributeList = getBandContributeRankRes.data.list;
			},
			async loadData() {
				this.bandId = this.currentBand
				if(this.bandId) {
					var bandRes = await arequest('/loadBand?bandId=' + this.bandId, null, {})
					this.bandInfo = bandRes.data

					this.loadFansRank()
					this.reloadComment()
				} else {
					this.$nextTick(() => {
						console.log("bandId is not supplied")
						uni.switchTab({
							url: "../billboard/billboard"
						})
					})
				}
			},
			async steal(){
				this.addToStealedBand(this.bandId)
				
				var stealRes = await arequest('/steal', { id: this.bandId }, {});
				this.stealResult = stealRes.data.score
				
				var bandRes = await arequest('/loadBand?bandId=' + this.bandId, null, {})
				this.bandInfo = bandRes.data
				
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
				
				this.$nextTick(() => {
					setTimeout(() => {
						uni.switchTab({
							url: "/pages/fans/fans"
						});
					}, 1000);
				});
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
	uni-button[disabled]:not([type]),
	uni-button[disabled][type=default] {
		color: rgba(255, 255, 255, 0.5);
	}
</style>


