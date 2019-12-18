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
						<button v-if="!userInfo.bindedBand" class="btn-join" @click="joinFansGroup()">加入粉丝团</button>
						<button v-if="userInfo.bindedBand" class="btn-join" @click="contributeIntergral()">贡献积分<text class="icon-contribute-intergral"></text></button>
					</view>
				</view>
			</view>	
			
			<view class="contribute-box" @click="gotoContribute()">
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
			
			<view class="task-box" v-if="userInfo.bindedBand">
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
				
			<view class="section">
				<ul class="message-list">
					<li class="message-item" 
						:class="{'active': item.selected}" 
						v-for="(item, index) in fanlist" 
						:key="index" 
						@tap="selectFans(item)"
					>
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
		
		<!--贡献积分底部弹窗  -->
		<uni-popup ref="showtipbottom" :type="type" :mask-click="false">
			<view class="uni-tip uni-tip-contribute-intergral">
				<view class="icon-close" @click="closeBottomPop()"></view>
				<view class="prop-list">
					<view class="prop-box" v-for="(item,index) in propList" 
						:key="index"
						:class="{'is-select': item.selected}"
						@click="selectProp(item)">
						<image :src="item.img" class="img"></image>
						<view class="name">{{item.name}}</view>
						<view class="integral">{{item.integral}}<text class="icon-contribute"></text> </view>
					</view>
				</view>
				<view class="tip-bottom-area">
					<view class="left-content">可用积分: <text class="val">30000</text></view>
					<button class="btn-join" @click="confirmContribute()">
						贡献积分
						<text class="icon-contribute-intergral"></text>
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
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
				contributeList: [],
				type: '',
				propList: [],
				comments: [],
				commentPage: 0,
				commentPageSize: 10,
				bandInfo: {}
			}
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
					// console.log("bandInfo " + bandInfo + " bandId " + bandId)
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
		},
		onLoad(option) {
			this.loadData(option)
		}
	}
</script>

<style lang="less">
	@import url('fans.less');
</style>

