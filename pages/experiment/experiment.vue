<template>
	<view>
		<view class="btn-sign-out" @tap="test()" v-if="userInfo.id">
			测试
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { arequest } from '../../room8Util.js'
	import _ from 'lodash'
	export default {
		data() {
			return {
				rooms: []
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			async loadData(){
				var res = await arequest('/', null, {})
				this.rooms = res.data
			},
			test() {
				
			}
		},
		onShow() {
			this.loadData()
		}
	}
</script>

<style>

</style>
