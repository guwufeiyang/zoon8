<template>
	<view class="container">
		<!-- <view v-if="bandId">
			<view class="header-bg"></view>
			<image class="header-img" src="../../static/fans-bg.png"></image>
		</view>
		<view class="status_bar" :style="{color: statusBarColor}">
			<text v-if="bandId">{{bandInfo.name}}</text>粉丝团
		</view> -->
		
		<view class="content-wrap" v-if="!bandId">
			<view class="not-fans-wrap">
				<image class="not-fans-img" src="../../static/not-fans.png"></image>
				<text class="not-fans-text">你还没有加入粉丝团哦 快去榜单选择心仪爱豆加入粉丝团</text>
				<button class="btn-red" @click="jumpToBillboard">去榜单页面</button>
			</view>
		</view>
		
		<view class="content-wrap" v-if="userInfo.token && bandId">
			<view class="header-bg"></view>
			<image class="header-img" src="../../static/fans-bg.png"></image>
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
					<!--<button v-if="!userInfo.bindedBand" class="btn-join" @click="joinFansGroup()">加入粉丝团</button>-->
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
							<image class="contribute-img"  :src="item.avatar"></image>
							<view class="index" :style="{backgroundColor: item.bg}">{{index+1}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="task-box" v-if="userInfo.bindedBand == bandId">
				<view class="task-item" @click="doTask()">
					<image class="task-img" src="../../static/icon-sign.png"></image>
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
			
			<view class="section">
				<view class="message-list">
					<view class="message-item-wrap" 
						:class="{'active': item.id == item.bandId}" 
						v-for="(item, index) in comments" 
						:key="index">
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
					<view class="prop-box" 
						:class="{'is-select': item.selected}" 
						@click="selectProp(item)" 
						v-for="(item, index) in propList" 
						:key="index" >
						<image :src="item.img" class="img"></image>
						<view class="name">{{item.name}}</view>
						<view class="integral">
							{{item.price}}
							<image class="icon-integral " src="../../static/icon-integral.png"></image> 
						</view>
					</view>
				</view>
				<view class="tip-bottom-area">
					<view class="left-content">
						可用积分: <text class="val">{{userInfo.amount}}</text> 
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
					+ {{selectedProp.price}} 
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
				<textarea class="textarea" v-model="commentContent" placeholder="写入留言" placeholder-class="graywords"/>
			</view>
		</uni-popup>
		
		<!--获取积分弹窗  -->
		<uni-popup ref="showGetTntegralPop" :type="type" :mask-click="false">
			<view class="uni-tip uni-get-integral">
				<image class="icon-close" @click="closeGetTntegralPop()" src="../../static/close.png"></image>
				<view class="tip">积分不足，可通过以下方式获取</view>
				<view class="box-list">
					<view class="box-item" @click="doTask()">
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
	import { mapState, mapMutations } from 'vuex'
	import { arequest, dateFormat } from '../../room8Util.js'
	import _ from "lodash"

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
				propList: [],
				comments: [],
				commentPage: 0,
				commentPageSize: 10,
				selectedProp: {},
				commentContent: ""
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

				this.bandId = this.userInfo.bindedBand

				if(this.bandId) {
					this.bandInfo = this.bands.find((item)=>{
						return item.id == this.bandId
					})

					var commentsRes = await arequest('/loadComment', {
						id: this.bandId, 
						offset: this.commentPage * this.commentPageSize, 
						limit: this.commentPageSize,
					}, {})
					this.comments = commentsRes.data;
					
					console.log(this.comments)
					
					if(this.comments && this.comments.length > 0) {
						this.comments.forEach(item=>{
							item.time = new Date(item.createTimestamp)
							item.selected = false;
						});
						// this.comments[0].selected = true;
					}

					// 获取贡献榜
					let getBandContributeRankRes = await arequest('/getBandContributeRank', { id: this.bandId }, {});
					let getBandContributeRank = getBandContributeRankRes.data;
					let colorList = ["#fa6889","#f98c4e", "#eb68fa", "#8b68fa", "#68dffa"];
					
					getBandContributeRank.forEach((item, i)=> {
						item.bg = colorList[i];
					});
					this.contributeList = getBandContributeRank;
				}

				// 获取道具
				if(this.userInfo.id) {
					let propListRes = await arequest('/loadAllGifts', null, {})
					let propList = propListRes.data || []
					_.each(propList, item=>{
						item.selected = false
					})
					this.propList = propList
				}
			},
			toLogin() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			jumpToBillboard() {
				uni.switchTab({
					url: "/pages/billboard/billboard"
				})
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
			async confirmContribute() {
				this.$refs.contributeIntegralPop.close();
				
				this.type = 'center';
				
				var gifts = this.propList.filter(item=>{
					return item.selected
				}).map(item=>{
					return {
						"id": item.id,
						"price": item.price
					}
				})
				var contributeRes = await arequest('/contribute', gifts, {})
				
				// uni.showToast({
					//title: "" + this.propList.reduce((sum, item) =>{ return sum + parseInt(item.selected ? item.price : 0)}, 0)
				// })
				
				
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
				this.$refs.contributeIntegralPop.close();
				
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
			async confirmSendMsg() {
				if(!this.commentContent){
					this.$api.msg('评论不能为空');
					return;
				}
				var addCommentRes = await arequest('/addComment', {
					content: this.commentContent
				}, {})
				
				var commentsRes = await arequest('/loadComment', {
					id: this.bandId, 
					offset: this.commentPage * this.commentPageSize, 
					limit: this.commentPageSize,
				}, {})
				this.comments = commentsRes.data
				
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

