<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio">
			<radio :checked="allCheck" color="#c00000" @click="checkClick()" /><text>全选</text>
		</label>
		
		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedTotalPrice}}</text>
		</view>
		
		<!-- 结算区域 -->
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedTotalPrice']),
			allCheck() {
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart', ['updataAllCheck']),
			checkClick() {
					this.updataAllCheck(this.allCheck)
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 5px;
	font-size: 14px;
	
	.radio{
		display: flex;
		align-items: center;
	}
	
	.amount-box{
		.amount{
			color: #c00000;
			font-weight: bolder;
		}
	}
	
	.btn-settle{
		background-color: #c00000;
		height: 50px;
		line-height: 50px;
		padding: 0 10px;
		color: white;
		min-width: 100px;
		text-align: center;
	}
}
</style>