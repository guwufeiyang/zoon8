<template>
	<view class="container">
		
		<view class="content-wrap" v-if="!userInfo.bindedBand">
			<view class="not-fans-wrap">
				<image class="not-fans-img" src="../../static/not-fans.png"></image>
				<text class="not-fans-text">你还没有加入粉丝团哦 快去榜单选择心仪爱豆加入粉丝团</text>
				<button class="btn-red" @click="jumpToBillboard">去榜单页面</button>
			</view>
		</view>
		
		<view class="content-wrap" v-if="userInfo.id && userInfo.bindedBand">
			<view class="header-bg"></view>
			<image class="header-img" src="../../static/fans-bg.png"></image>
			<view class="fans-info">
				<image class="portrait" :src="bandInfo.logo || '/static/missing-face.png'"></image>
				<view class="info-m">
					<view class="username">{{bandInfo.name}}</view>
					<view class="rank-info">
						<view class="rank-info-item">
							<view class="info-val">No.{{(bandInfo.totalRank && bandInfo.totalRank.rankValue) || '--'}}</view>
							<view class="info-label">当前排名</view>
						</view>
						<view class="integral-info-item">
							<view class="info-val">{{(bandInfo.totalRank && bandInfo.totalRank.amount) || "--"}}</view>
							<view class="info-label">累计积分</view>
						</view>
					</view>
				</view>
				<view class="info-r">
					<button class="btn-join" @click="contributeIntergral()">
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
							<image class="contribute-img" :src="item.avatar"></image>
							<view class="index" :style="{backgroundColor: colorList[index]}">{{index+1}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="task-box">
				<view class="task-item" @click="doTask()">
					<image class="task-img" src="../../static/icon-sign.png"></image>
					<text class="task-txt">做任务</text>
				</view>
				<view class="task-item" @click="sendMessage()">
					<image class="task-img" src="../../static/icon-message.png"></image>
					<text class="task-txt">发留言</text>
				</view>
				<view class="task-item" @click="drawLottery()">
					<image class="task-img" src="../../static/icon-lottery.png"></image>
					<text class="task-txt">去抽奖</text>
				</view>
			</view>
			
			<view class="section">
				<view class="message-list" v-if="commentPage.list.length > 0">
					<view class="message-item-wrap" :class="{'active': item.fanId == item.bandId}" v-for="(item, index) in commentPage.list" :key="index">
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
		<uni-popup ref="joinFansGroupPop" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-content">
					您将加入{{bandInfo.name}}的粉丝团！
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
					<view class="prop-box" :class="{'is-select': item.selected}" @click="selectProp(item)" v-for="(item, index) in propList" :key="index" >
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
						<text @click="getIntegral()" class="get-integral-btn">
							获取积分 >
						</text>
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
					<button class="btn" @tap="cancelSendMsg()">取消</button>
					<button class="btn" @tap="confirmSendMsg()">确定</button>
				</view>
				<input 
					type="text" 
					class="textarea" 
					:maxlength="29" 
					placeholder="写入留言,最多30个字" 
					v-model="commentContent"
					confirm-type="send"
				/>
				<!-- <textarea 
					class="textarea" 
					v-model="commentContent" 
					placeholder="写入留言,最多30个字" 
					placeholder-class="graywords"
				/> -->
			</view>
		</uni-popup>
		
		<!--获取积分弹窗  -->
		<uni-popup ref="showGetTntegralPop" :type="type" :mask-click="false">
			<view class="uni-tip uni-get-integral">
				<image class="icon-close" @click="closeGetTntegralPop()" src="../../static/close.png"></image>
				<view class="tip">{{lackIntegralTip}}</view>
				<view class="box-list">
					<view class="box-item" @click="doTask()">
						<image src="../../static/img-task.png" class="box-bg"></image>
						<view class="box-content">
							<view class="label">做任务</view>
							<view class="desc">支出你的爱豆</view>
						</view>
					</view>
					<view class="box-item" @click="drawLottery()">
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
	import moment from "moment"
	import { arequest } from '../../room8Util.js'
	import _ from "lodash"

	import uniPopup from '@/components/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				bandInfo: {},

				contributeList: [],
				type: '',
				propList: [],
				
				commentPage: {
					offset: 0,
					limit: 10,
					total: 0,
					list: []
				},
				
				selectedProp: {},
				commentContent: "",
				colorList: ["#fa6889","#f98c4e", "#eb68fa", "#8b68fa", "#68dffa"],
				lackIntegralTip: '积分不足，可通过以下方式获取'
			}
		},
		async onLoad(){
			if(this.bandInfo.name) {
				uni.setNavigationBarTitle({
					title: this.bandInfo.name+'粉丝团'
				});
			}	
		},
		computed: {
			...mapState(['userInfo', 'gifts', 'currentBand']),
			statusBarColor() {
				return this.userInfo.bindedBand ? "#fff": "#000"
			}
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
			...mapMutations(['login', 'setCurrentBand']),
			async reloadComment() {
				var commentsRes = await arequest('/loadComment', {
					id: this.userInfo.bindedBand,
					offset: this.commentPage.offset,
					limit: this.commentPage.limit
				}, {})
				this.commentPage = commentsRes.data;
			},
			async reloadMe() {
				var meRes = await arequest('/me', null, {})
				this.login(meRes.data.me || meRes.data)
			},
			async reloadFansRank() {
				if(!this.userInfo.bindedBand) {
					this.contributeList = []
				} else {
					let getBandContributeRankRes = await arequest('/getBandContributeRank?rankType=Total&limit=5', { 
						id: this.userInfo.bindedBand,
						}, {});
					this.contributeList = getBandContributeRankRes.data.list
				}
			},
			async loadData() {
				if(this.userInfo.bindedBand && this.userInfo.band) {
					this.reloadComment();
					this.reloadFansRank()
				}
				this.bandInfo = this.userInfo.band || {}
				
				this.propList = _.map(this.gifts, item=>{
					item.selected = false
					return item
				})
			},
			toLogin() {
				uni.redirectTo({
					url: "../login/login"
				})
			},
			jumpToBillboard() {
				uni.switchTab({
					url: "/pages/billboard/billboard"
				})
			},
			drawLottery() {
				uni.navigateTo({
					url: "../drawLottery/drawLottery"
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
				var contributeRes = await arequest('/contribute', {gifts: gifts}, {})
				var contributeResult = contributeRes.data
				if(contributeResult == 0) { // success
					await this.reloadMe()
					this.bandInfo = this.userInfo.band || {}
					
					this.reloadFansRank()
					
					this.$nextTick(() => {
						setTimeout(() => {
							this.$refs.confirmContributeIntegralPop.open()
						}, 0);

						setTimeout( ()=> {
							this.$refs.confirmContributeIntegralPop.close()
						}, 1500);
					});
				} else {
					this.$refs.contributeIntegralPop.close();
					this.type = 'center';
					this.$nextTick(() => {
						this.$refs.showGetTntegralPop.open();
					});
				}
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
				this.setCurrentBand(this.userInfo.bindedBand);
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
				this.lackIntegralTip = '通过以下方式获取积分';
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
				
				this.reloadComment()

				this.commentContent = ""
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

