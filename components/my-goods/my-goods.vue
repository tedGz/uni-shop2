<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="left-area">
			<radio :checked="item.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<img :src="item.goods_small_logo || defaultPic" class="goods-pic" alt="">
		</view>
		<!-- 右侧盒子 -->
		<view class="right-area">
			<!-- 商品标题 -->
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<view class="goods-info">
				<!-- 商品价格 -->
				<view class="goods-price">
					￥{{item.goods_price | tofixed}}
				</view>
				<uni-number-box :min="1" v-if="showNum" :value="item.goods_count" @change="numChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.soutu123.com%2Felement_origin_min_pic%2F01%2F40%2F65%2F61573d0bf6a3c2b.jpg%21%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.soutu123.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654334085&t=60d9574c17395b22cb5fe40125ffa1f2'
			};
		},
		filters:{
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods:{
			radioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state
				})
			},
			numChangeHandler(val) {
				this.$emit('num-change', {
					goods_id: this.item.goods_id,
					goods_count: val - 0
				})
			},
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	width: 750rpx;
	box-sizing: border-box;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	
	.left-area {
		margin-right: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.right-area {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		
		.goods-name {
			font-size: 13px
		}
		.goods-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.goods-price {
				color: red;
				font-size: 16px
			}
		}
	}
}
</style>