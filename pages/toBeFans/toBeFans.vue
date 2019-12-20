<template>
	<view class="container">
		<view class="header-bg"></view>
		<image class="header-img" src="../../static/fans-bg.png"></image>
		
		<view class="status_bar">
			<text>{{bandInfo.name}}</text>粉丝团
		</view>
		
		<view class="content-wrap">
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
							<view class="info-val">{{bandInfo.integral || "--"}}</view>
							<view class="info-label">本日积分</view>
						</view>
					</view>
				</view>
				<view class="info-r">
					<button class="btn-join" @click="joinFansGroup()">加入粉丝团</button>
				</view>
			</view>
			
			<view class="contribute-box" @click="gotoContribute()">
				<image class="contribute-box-l" src="../../static/contribute-box-border.png"></image>
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
			
			<scroll-view class="view-content" scroll-y >
				<view class="section">
					<view class="message-list">
						<view class="message-item-wrap" :class="{'active': item.selected}" v-for="(item, index) in comments" :key="index" @tap="selectFans(item)">
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
				</view>
			</scroll-view>
		</view>
		
		<!--确认加入弹窗  -->
		<uni-popup ref="showtip" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-content">
					您将加入王一博的粉丝团，<br />暂不提供退团功能哦！
				</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel()">再看看</text>
					<text class="uni-tip-button" @click="confirmJoin()">加入</text>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	var dateFormat = {
	    padLeftZero: function (str) {
	        return ('00' + str).substr(str.length)
	    },
	    formatDate: function (date, fmt) {
	        if (/(y+)/.test(fmt)) {
	            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	        }
	        let o = {
	            'M+': date.getMonth() + 1,
	            'd+': date.getDate(),
	            'h+': date.getHours(),
	            'm+': date.getMinutes(),
	            's+': date.getSeconds()
	        }
	        for (let k in o) {
	            if (new RegExp(`(${k})`).test(fmt)) {
	                let str = o[k] + ''
	                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
	            }
	        }
	        return fmt
	    }
	}
	
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'

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
				propList: [],
				comments: [],
				commentPage: 0,
				commentPageSize: 10
			}
		},
		computed: {
			...mapState(['userInfo', 'bands', 'currentBand']),
			statusBarColor() {
				return this.userInfo.bindedBand ? "#fff": "#000"
			}
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
			...mapMutations(['login', 'setBands']),
			async loadData() {
				if(!this.bands) {
					var bands = await arequest('/loadBands', null, {})
					this.setBands(bands.data)
				}

				this.bandId = this.currentBand || this.userInfo.bindedBand
				if(this.bandId) {
					this.bandInfo = this.bands.find((item)=>{
						return item.id == this.bandId
					})
				}
				
				if(this.userInfo.bindedBand) {
					this.comments = await arequest('/loadComment', {offset: this.commentPage * this.commentPageSize, limit: this.commentPageSize}, {});
					
					var commentsRes = await arequest('/loadComment', {
						id: this.bandId, 
						offset: this.commentPage * this.commentPageSize, 
						limit: this.commentPageSize,
					}, {})
					this.comments = commentsRes.data
					
					if(this.comments) {
						this.comments.forEach(item=>{
							item.time = new Date(item.createTimestamp)
							item.selected = false;
						});
						this.comments[0].selected = true;
					}
				}

				// 获取贡献榜
				this.contributeList = await this.$api.json('contributeList');
				
				// 获取道具
				let propList = await this.$api.json('propList');
				let newPropList = propList.map(item => {
					item.selected = false;
					return item;
				})
				this.propList  = newPropList;
				
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
			joinFansGroup(open) {
				this.type = 'center';
				this.$nextTick(() => {
					this.$refs.showtip.open();
				});
			},
			// 贡献积分
			contributeIntergral() {
				// 如果积分不足
				
				// 如果积分充足
				this.type = 'bottom';
				this.$nextTick(() => {
					this.$refs.showtipbottom.open();
				})
			},
			cancel() {
				this.$refs.showtip.close();
			},
			confirmJoin() {
				this.$refs.showtip.close();
			},
			closeBottomPop() {
				this.$refs.showtipbottom.close();
			},
			selectProp(item) {
				item.selected = !item.selected;
			},
			
			getIntegral() {
				
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
</style>


