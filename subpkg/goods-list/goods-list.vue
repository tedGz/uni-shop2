<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
				<my-goods :item="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 请求数据对象
				querryObj: {
					// 请求关键词
					query: '',
					// 商品id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				goodsList:[],
				total:0,
				isloading: true
			};
		},
		onLoad(options) {
			this.querryObj.query = options.query || ''
			this.querryObj.cid = options.cid
			
			this.getGoodsList()
		},
		methods:{
			// 获取商品列表数据的方法
			async getGoodsList(cb) {
				// 打开节流阀
				this.isloading = true
				const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.querryObj)
				// 关闭节流阀
				this.isloading = false
				// 执行回调函数 关闭下拉加载更多
				cb && cb()
				if(res.meta.status !== 200) return uni.$showMsg()
				
				// 将上一次获取到的数据与这一次的一同放入 goodlist 里
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			// 跳转到商品详情
			gotoDetail(item) {
				uni.navigateTo({
					url:'/subpkg/goods-detail/goods-detail?goods_id=' + item.goods_id
				})
			}
		},
		onReachBottom() {
			// 判断是否还有下一页数据
			if(this.querryObj.pagenum * this.querryObj.pagesize >= this.total) return uni.$showMsg('数据已全部加载！！！')
			// 节流阀判断
			if(this.isloading) return 
			// 让页码值自增加1
			this.querryObj.pagenum += 1
			this.getGoodsList()
		},
		onPullDownRefresh() {
			// 重置关键数据
			this.querryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			
			// 重新发起数据请求
			this.getGoodsList(()=> uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
