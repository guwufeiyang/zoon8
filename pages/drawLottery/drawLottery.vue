<template>
	<view class="container">
		<view class="content">
			<image class="light1" src="../../static/light1.png"></image>
			<view class="title-wrap">
				<image src="../../static/lottery-title.png" class="lottery-title"></image>
				<image src="../../static/lottery-title-bg.png" class="lottery-title-bg"></image>
				<image src="../../static/icon-face1.png" class="icon-face1"></image>
				<view class="title-content">
					<view class="title1">每天可以免费抽奖<text class="space"></text> 次！</view>
					<view class="title2">{{userInfo.lottery.lotteryFee}}积分抽一次，奖品拿不停！</view>
					<image src="../../static/3.png" class="three"></image>
				</view>
			</view>
			<view class="turntable-bottom">
				<view class="tip">
					现有积分: 
					<text class="red-txt">{{ userInfo.amount }}</text>分
					今日还可免费抽奖
					<text class="red-txt">{{ userInfo.lottery.lotteryFreeCount - userInfo.lottery.count >= 0 ? userInfo.lottery.lotteryFreeCount - userInfo.lottery.count : 0 }}</text>次
				</view>
				<!-- <view class="btn-wrap">
					<button class="btn">
						<image class="btn-icon" src="../../static/icon-question.png"></image>活动规则
					</button>
					<button class="btn">
						<image class="btn-icon" src="../../static/icon-reward.png"></image>我的奖品
					</button>
				</view> -->
			</view>
			<view class="turntable-wrap">
				<image src="../../static/colour-ribbon.png" class="colour-ribbon"></image>
				<view class="prize-winner-wrap" v-if="userInfo.lotteryMessage">
					<view class="prize-winner">
						<text class="name">王一博</text> 获得10000积分
					</view>
					<view class="prize-winner">
						<text class="name">王一博</text> 获得10000积分
					</view>
				</view>
				<view class="turntable-box">
					<image class="light2" src="../../static/light2.png"></image>
					<image src="../../static/ribbon.png" class="ribbon"></image>
					<image src="../../static/turntable.png" class="turntable" :style="{transform: rotateDeg}"></image>
					<image src="../../static/icon-go.png" class="icon-go" @click="startLottery"></image>
					<image src="../../static/icon-face2.png" class="icon-face2"></image>
					<image src="../../static/icon-face3.png" class="icon-face3"></image>
				</view>
			</view>
			
		</view>
		<!--抽奖确认弹窗  -->
		<view class="popup lottery-pop" v-if="showTotteryPop" @click.stop.prevent = "stopPenetrate">
			<view class="mask"></view>
			<view class="uni-lottery-pop">
				<image v-if="lotteryType=='success'" class="lottery-model-light" src="../../static/light3.png"></image>
				<image v-if="lotteryType=='success'" src="../../static/lottery-model-bg.png" class="lottery-model-bg"></image>
				<image v-if="lotteryType=='fail'" src="../../static/lottery-model-bg1.png" class="lottery-model-bg lottery-model-bg-gray"></image>
				<image class="icon-close" @click="closeLotteryPop()" src="../../static/close.png"></image>
				<view class="lottery-content">
					<view class="title">{{lotteryTip}}</view>
					<view class="desc">{{lotteryContent}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest, dateFormat } from '../../room8Util.js'
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				rotateDeg: 0, // 将要旋转的角度
				showTotteryPop: false,

				lotteryType: '',
				lotteryTip: '', // 抽奖结果
				lotteryContent: '获得了10000积分',
				cat: 45, // 总共8个扇形区域，每个区域约45度
				isAllowClick: true, // 是否能够点击
				start_rotating_deg: 0, // 初始旋转角度

				rotate_angle: 0, // 实际偏移角度
			};
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			...mapMutations(['login']),
			stopPenetrate() {
			    return;
			},
			startLottery() {
				this.rotating();
			},
			closeLotteryPop() {
				this.showTotteryPop = false;
			},
			async rotating() {
				if (!this.isAllowClick) return;
				if (this.userInfo.lottery.lotteryFreeCount <= this.userInfo.lottery.count && this.userInfo.amount < this.userInfo.lottery.lotteryFee) {
					this.$api.msg('积分不足！');
					return;
				}
				if(this.userInfo.lottery.lotteryFreeCount <= this.userInfo.lottery.count) {
					this.userInfo.amount = this.userInfo.amount - this.userInfo.lottery.lotteryFee
				}
				
				this.isAllowClick = false;

				var lotteryRes = await arequest('/lottery', {}, {})
				var lotteryResult = lotteryRes.data
				
				var randomDeg = 0
				let delta = Math.floor(Math.random() * 20); // 这个地方为啥不乘45？
				if(10000 == lotteryResult.score) {
					randomDeg = 45 * 8 - delta
				} else if(5 == lotteryResult.score) {
					randomDeg = 45 * 3 - delta
				} else if(88 == lotteryResult.score) {
					randomDeg = 45 * 7 - delta
				} else if(520 == lotteryResult.score) {
					randomDeg = 45 * 2 - delta
				} else if(1314 == lotteryResult.score) {
					randomDeg = 45 * 6 - delta
				} else if(6666 == lotteryResult.score) {
					randomDeg = 45 * 4 - delta
				} else {
					randomDeg = Math.random() % 2 == 1 ? 45 - delta : 45 *5 - delta				
				}
				console.log("randomDeg " + randomDeg)
				 

				let rand_circle = 5; // 默认多旋转5圈
				// let randomDeg = Math.floor(Math.random() * 360); // 获取0到359之间的随机度数, 开发过程中后台获取
				let deg = this.start_rotating_deg + rand_circle * 360 + randomDeg - this.start_rotating_deg % 360; //将要旋转的度数
				this.start_rotating_deg = deg; // 下一次旋转的开始度数		
				this.rotateDeg = "rotate(" + deg + "deg)";
				this.rotate_angle = deg % 360; // 实际偏移的度数 
				
				setTimeout(async () => {
					this.isAllowClick = true;
					
					this.lotteryTip = '';
					this.lotteryContent = '';
					this.lotteryType = '';
					this.showTotteryPop = true;
					if (this.rotate_angle <= this.cat * 1) {
						this.lotteryType = 'fail';
						this.lotteryTip = '很遗憾';
						this.lotteryContent = '本次抽奖没有中奖哦';
					} else if (this.rotate_angle <= this.cat * 2) {
						this.lotteryType = 'success';
						this.lotteryTip = '恭喜您';
						this.lotteryContent = '获得了520积分';
					} else if (this.rotate_angle <= this.cat * 3) {
						this.lotteryType = 'success';
						this.lotteryTip = '恭喜您';
						this.lotteryContent = '获得了5积分';
					} else if (this.rotate_angle <= this.cat * 4) {
						this.lotteryType = 'success';
						this.lotteryTip = '恭喜您';
						this.lotteryContent = '获得了6666积分';
					} else if (this.rotate_angle <= this.cat * 5) {
						this.lotteryType = 'fail';
						this.lotteryTip = '很遗憾';
						this.lotteryContent = '本次抽奖没有中奖哦';
					} else if (this.rotate_angle <= this.cat * 6) {
						this.lotteryType = 'success';
						this.lotteryTip = '恭喜您';
						this.lotteryContent = '获得了1314积分';
					} else if (this.rotate_angle <= this.cat * 7) {
						this.lotteryType = 'success';
						this.lotteryTip = '恭喜您';
						this.lotteryContent = '获得了88积分';
					} else if (this.rotate_angle <= this.cat * 8) {
						this.lotteryType = 'success';
						this.lotteryTip = '恭喜您';
						this.lotteryContent = '获得了10000积分';
					}
					
					var meRes = await arequest('/me', null, {})
					this.login(meRes.data.me || meRes.data)
				}, 3500);
			}
		}
	}
</script>

<style lang="less">
	@import url('drawLottery.less');
</style>
