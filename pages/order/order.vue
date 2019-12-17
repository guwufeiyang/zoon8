<template>
	<view class="orderPage">
		<view class="tabBar">
			<view class="tab" :class="{'active':active===0}" @click="tabSwitch(0)">
				全部
			</view>
			<view class="tab" :class="{'active':active===1}" @click="tabSwitch(1)">
				已支付
			</view>
			<view class="tab" :class="{'active':active===2}" @click="tabSwitch(2)">
				未支付
			</view>
		</view>
		<view class="list">
			<view class="sec" v-for="item in list" :key="item.id">
				<image :src="item.img" class="img" mode=""></image>
				<view class="con">
					<view class="title">
						{{item.title}}
					</view>
					<view class="detail">
						{{item.detail}}
					</view>
					<view class="status">
						{{payStates[item.status]}}
					</view>
				</view>
				<view class="btn">
					{{orderStates[item.type]}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { payStates, orderStates } from '../../Dictionary.js'
	export default {
		data() {
			return {
				active: 0,
				list: [],
				payStates,
				orderStates
			};
		},
		methods: {
			tabSwitch(n) {
				this.active = n
			},
			async loadData() {
				this.list = await this.$api.json('orderList');
			},
		},
		onLoad() {
			this.loadData();
		},
	}
</script>

<style lang="less">
	@import url('order.less');
</style>
