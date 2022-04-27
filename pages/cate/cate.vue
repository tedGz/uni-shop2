<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧滚动区域 -->
			<scroll-view class="left-scroll" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view @click="activeChange(index)" :class="['left-scroll-item', index === currentIndex ? 'active' : '']">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧滚动区域 -->
			<scroll-view class="right-scroll" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateList_lv2" :key="index2">
					<!-- 二级分类标题 -->
					<view class="cate-lv2-title">
						/ {{item2.cat_name}} /
					</view>
					<!-- 二级分类下的三级类列表 -->
					<view class="cate-lv3-list">
						<!-- 三级分类的 Item 项 -->
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							<!-- 三级分类图片 -->
							<image :src="item3.cat_icon" mode=""></image>
							<!-- 三级分类标题 --> 
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view> 
			</scroll-view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				cateList: [],
				currentIndex: 0,
				cateList_lv2:[],
				scrollTop: 0
			}
		},
		onLoad() {

			// 获取设备高度
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			
			// 请求 CateList 数据
			this.getCateList()
		},
		methods: {
			// 请求 CateList 数据方法
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				console.log(res);
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				
				this.cateList_lv2 = res.message[0].children
			},
			
			// 点击侧边栏事件
			activeChange(index) {
				this.currentIndex = index
				// 为二级分类赋值
				this.cateList_lv2 = this.cateList[index].children
				
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			
			// 跳转到商品列表页面
			gotoGoodsList(item) {
				uni.navigateTo({
					url:'/subpkg/goods-list/goods-list?cid=' + item.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
		background-color: #FFFFFF;
	}

	.left-scroll {
		width: 120px;

		.left-scroll-item {
			background-color: #F7F7F7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;

			&.active {
				background-color: #FFFFFF;
				position: relative;

				&::before {
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: black;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
	.cate-lv2-title {
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;
	}
	.cate-lv3-item {
		width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		
		image {
			width: 60px;
			height: 60px;
		}
		
		text {
			font-size: 12px;
		}
	}
</style>
