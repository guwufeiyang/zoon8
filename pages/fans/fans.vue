<template>
	<view class="container">
		<view v-if="bandId">
			<view class="header-bg"></view>
			<image class="header-img" src="../../static/fans-bg.png"></image>
		</view>
		<view class="status_bar" :style="{color: statusBarColor}">
			<text v-if="bandId">{{bandInfo.name}}</text>粉丝团
		</view>
		
		<view class="content-wrap" v-if="!bandId">
			<view class="not-fans-wrap">
				<image class="not-fans-img" src="../../static/not-fans.png"></image>
				<text class="not-fans-text">你还没有加入粉丝团哦 快去榜单选择心仪爱豆加入粉丝团</text>
				<!-- 为了调试样式，后面会删除 -->
				<button @click="sendMessage()">发留言</button>
				<button @click="getIntegral()">获取积分</button>
				<button @click="contributeIntergral()">贡献积分</button>
			</view>
		</view>
		
		<view class="content-wrap" v-if="bandId">
			<view class="fans-info">
				<image class="portrait" :src="bandInfo.logo || '/static/missing-face.png'"></image>
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
					<button v-if="!userInfo.bindedBand" class="btn-join" @click="joinFansGroup()">加入粉丝团</button>
					
					<button v-if="userInfo.bindedBand == bandId" class="btn-join" @click="contributeIntergral()">
						贡献积分
						<image class="icon-integral" src="../../static/icon-contribute-intergral.png"></image>
					</button>
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
			
			<view class="task-box" v-if="userInfo.bindedBand == bandId">
				<view class="task-item" @click="doTask()">
					<image class="task-img" src="../../static/icon-task.png"></image>
					<text class="task-txt">做任务</text>
				</view>
				<view class="task-item" @click="sendMessage()">
					<image class="task-img" src="../../static/icon-message.png"></image>
					<text class="task-txt">发留言</text>
				</view>
				<view class="task-item">
					<image class="task-img" src="../../static/icon-lottery.png"></image>
					<text class="task-txt">去抽奖</text>
				</view>
			</view>
			
			
			<scroll-view class="view-content" scroll-y :style="{top: setTopVal}">	
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
		<uni-popup ref="joinFansGroupPop" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-content">
					您将加入{{bandInfo.name}}的粉丝团，<br />暂不提供退团功能哦！
				</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancelJoinFansGroup()">再看看</text>
					<text class="uni-tip-button" @click="confirmJoinFansGroup()">加入</text>
				</view>
			</view>
		</uni-popup>
		
		<!--贡献积分底部弹窗  -->
		<uni-popup ref="contributeIntegralPop" :type="type" :mask-click="false">
			<view class="uni-tip uni-tip-contribute-intergral">
				<image class="icon-close" @click="closeContributeIntegralPop()" src="../../static/icon-close.png"></image>
				<view class="prop-list">
					<view class="prop-box" v-for="(item,index) in propList" 
						:key="index"
						:class="{'is-select': item.selected}"
						@click="selectProp(item)">
						<image :src="item.img" class="img"></image>
						<view class="name">{{item.name}}</view>
						<view class="integral">
							{{item.integral}}
							<image class="icon-integral " src="../../static/icon-integral.png"></image> 
						</view>
					</view>
				</view>
				<view class="tip-bottom-area">
					<view class="left-content">
						可用积分: <text class="val">30000</text> 
						<text @click="getIntegral()">获取积分 ></text>
					</view>
					<button class="btn-join" @click="confirmContribute()">
						贡献积分
						<image src="../../static/icon-contribute-intergral.png" class="icon-integral"></image>
					</button>
				</view>
			</view>
		</uni-popup>
		
		<!--贡献积分确认弹窗  -->
		<uni-popup ref="confirmContributeIntegralPop" :type="type" :mask-click="false">
			<view class="uni-tip uni-confirm-contribute-intergral">
				<image :src="selectedProp.img" class="img"></image>
				<view class="integral">
					+ {{selectedProp.integral}} 
				</view>
			</view>
		</uni-popup>
		
		<!--评论弹窗弹窗  -->
		<uni-popup ref="showSendCommentPop" :type="type" :mask-click="false">
			<view class="uni-tip uni-tip-comment">
				<view class="btn-area">
					<button class="btn" @click="cancelSendMsg()">取消</button>
					<button class="btn" @click="confirmSendMsg()">确定</button>
				</view>
				<textarea class="textarea" placeholder="写入留言" />
			</view>
		</uni-popup>
		
		<!--获取积分弹窗  -->
		<uni-popup ref="showGetTntegralPop" :type="type" :mask-click="false">
			<view class="uni-tip uni-get-integral">
				<image class="icon-close" @click="closeGetTntegralPop()" src="../../static/close.png"></image>
				<view class="tip">积分不足，可通过以下方式获取</view>
				<view class="box-list">
					<view class="box-item">
						<image src="../../static/img-task.png" class="box-bg"></image>
						<view class="box-content">
							<view class="label">做任务</view>
							<view class="desc">支出你的爱豆</view>
						</view>
					</view>
					<view class="box-item">
						<image src="../../static/img-lottery.png" class="box-bg"></image>
						<view class="box-content">
							<view class="label">去抽奖</view>
							<view class="desc">获取意外惊喜</view>
						</view>
					</view>
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
				commentPageSize: 10,
				selectedProp: {}
			}
		},
		computed: {
			...mapState(['userInfo', 'bands', 'currentBand']),
			statusBarColor() {
				return this.userInfo.bindedBand ? "#fff": "#000"
			},
			setTopVal() {
				// 此处值有两个 308+192 upx
				return uni.upx2px(308) + 'px'
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
			...mapMutations(['login', 'setBands', 'setCurrentBand']),
			async loadData() {
				if(!this.bands) {
					var bands = await arequest('/loadBands', null, {})
					this.setBands(bands.data)
				}

				this.bandId = this.currentBand || this.userInfo.bindedBand
				this.setCurrentBand(null)

				if(this.bandId) {
					this.bandInfo = this.bands.find((item)=>{
						return item.id == this.bandId
					})

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
			joinFansGroup() {
				this.type = 'center';
				this.$nextTick(() => {
					this.$refs.joinFansGroupPop.open();
				});
			},
			cancelJoinFansGroup() {
				this.$refs.joinFansGroupPop.close();
			},
			confirmJoinFansGroup() {
				this.$refs.joinFansGroupPop.close();
			},
			
			// 贡献积分
			contributeIntergral() {
				// 如果积分不足
				
				// 如果积分充足
				this.type = 'bottom';
				this.propList.forEach(item=>{
					item.selected = false;
				});
				this.$nextTick(() => {
					this.$refs.contributeIntegralPop.open();
				});
			},
			confirmContribute() {
				this.$refs.contributeIntegralPop.close();
				this.type = 'center';
				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.confirmContributeIntegralPop.open()
					}, 0);

					setTimeout( ()=> {
						this.$refs.confirmContributeIntegralPop.close()
					}, 1500);
				});
			},
			closeContributeIntegralPop() {
				this.$refs.contributeIntegralPop.close();
			},
			// 选择道具
			selectProp(item) {
				this.propList.forEach(item=>{
					item.selected = false;
				});
				this.selectedProp = item;
				item.selected = !item.selected;
			},
			gotoContribute() {
				uni.navigateTo({
					url: "/pages/contribute/contribute"
				})
			},
			doTask() {
				uni.navigateTo({
					url: "/pages/doTask/doTask"
				})
			},
			// 获取积分弹窗
			getIntegral() {
				this.type = 'center';
				this.$nextTick(() => {
					this.$refs.showGetTntegralPop.open();
				});
			},
			closeGetTntegralPop() {
				this.$refs.showGetTntegralPop.close();
			},
			// 发表留言弹窗
			sendMessage() {
				this.type = 'bottom';
				this.$nextTick(() => {
					this.$refs.showSendCommentPop.open();
				});
			},
			cancelSendMsg() {
				this.$refs.showSendCommentPop.close();
			},
			confirmSendMsg() {
				this.$refs.showSendCommentPop.close();
			}
		},
		onShow() {
			this.loadData()
		}
	}
</script>

<style lang="less">
	@import url('fans.less');
</style>

