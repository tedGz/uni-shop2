<template>
	<view>
		<!-- 搜索区域 -->
		<view class="search-box">
			<my-search @click.native="gotoSearch"></my-search>
		</view>
		<!-- 轮播图的区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods-detail/goods-detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航的区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image class="nav-img" :src="item.image_src" mode=""></image>
			</view>
		</view>

		<!-- 楼层分类的区域 -->
		<!-- 楼层容器 -->
		<view class="floor-list">
			<!-- 楼层大盒子 -->
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层小标题 -->
				<image class="floor-title" :src="item.floor_title.image_src" mode=""></image>
				<!-- 楼层图片区域 -->
				<view class="floor-pic-area">
					<navigator class="left-area" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-area">
						<navigator :url="item2.url" class="right-area-item" v-for="(item2,index2) in item.product_list" :key="index2"
							v-if="index2 !== 0">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList: [],
				// 导航栏数据
				navList: [],
				// 楼层数据
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			// 请求轮播图数据
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 请求失败
				if (res.meta.status !== 200) return uni.$showMsg()

				this.swiperList = res.message

				uni.$showMsg('数据请求成功')
			},
			// 请求导航栏数据
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()

				this.navList = res.message

				uni.$showMsg('数据请求成功')
			},
			// 导航栏点击跳转
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '../cate/cate'
					})
				}
			},
			// 请求楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				
				if (res.meta.status !== 200) return uni.$showMsg()
				
				res.message.forEach(floor => {
					floor.product_list.forEach(item => {
						item.url = '/subpkg/goods-list/goods-list?' + item.navigator_url.split('?')[1]
					})
					})
				this.floorList = res.message
			},
			// 跳转到搜索列表
			gotoSearch() {
				uni.navigateTo({
					url:'../../subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			height: 100%;
			width: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 10px 0;
	}

	.nav-img {
		// rpx 微信专有的单位 1rpx = 0.5px = 1物理像素
		width: 128rpx;
		height: 140rpx;
	}

	.floor-item {
		margin: 15px 0;
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}

	.right-area {
		display: flex;
		flex-wrap: wrap;
	}

	.floor-pic-area {
		display: flex;
		padding-left: 15rpx;
		justify-content: space-around;
	}
	.search-box {
		position: sticky;
		top: 0;
		z-index: 9
	}
</style>
