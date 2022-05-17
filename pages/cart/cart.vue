<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址的区域 -->
		<my-address></my-address>
		
		<!-- 商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 左侧的文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 循环渲染购物车中的商品信息 -->
		<uni-swipe-action>
			<block v-for="(item, index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swiperItemClickHander(item)">
					<my-goods :item="item" showNum="true" showRadio="true" @radio-change="radioChangehandler" @num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 商品结算栏 -->
		<my-settle></my-settle>
	</view>
	
	<!-- 空白购物车页面 -->
	<view class="empty-cart" v-else>
		<image src="../../static/cart_empty@2x.png" class="empty-img">
			<text class="tip-text">空空如也~~</text>
		</image>
	</view>
</template>

<script>
	import badgeMix from '@/mixin/tabbar-badge.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		mixins:[badgeMix],
		computed:{
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options:[{
					text:'删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			}
		},
		methods:{
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangehandler(e) {
				console.log(e);
				this.updateGoodsState(e)
			},
			// 监听商品的数量发生变化
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			swiperItemClickHander(item) {
				this.removeGoodsById(item)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			padding-left: 5px;
			border-bottom: 1px solid #efefef;
			
			.cart-title-text {
				font-size: 14px;
				margin-left: 10px;
			}
		}
	}
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		
		.empty-img{
			width: 90px;
			height: 90px;
			
		}
		.tip-text{
			font-size: gray;
			padding-top: 15px;
		}
	}
</style>
