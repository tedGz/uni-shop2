<template>
	<view>
		<!-- 搜素栏区域 -->
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton='none'></uni-search-bar>
		</view>
		
		<!-- 搜索建议列表区域 -->
		<view class="sugg-list" v-if="searchReasults.length !== 0">
			<view class="sugg-item" v-for="(item,index) in searchReasults" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史区域 -->
		<view class="history-box" v-else>
			<!-- 区域标题 -->
			<view class="history-title">
				<text>搜索历史</text>
			  <uni-icons @click="clean" type="trash" size="17"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag @click="gotoGoodsList(item)" :circle="true" class="history-list-item" :text="item" v-for="(item,index) in histories" :key='index'
				custom-style="background-color: #ebebeb; border:none; font-size: 14px; color: #000000;"
				></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchReasults: [],
				historyList:[]
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods:{
			input(e) {
				
				clearTimeout(this.timer)
				
				this.timer = setTimeout(()=>{
					this.kw = e
					this.getSearchList()
				},500)
			},
			async getSearchList() {
				if(this.kw.length === 0) {
					this.searchReasults = []
					return
				}
				// 获取搜索信息
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
				if(res.meta.status !== 200 ) return uni.$showMsg()
				this.searchReasults = res.message
				
				this.saveSearchHistory()
			},
			gotoDetail(item) {
				console.log(item.goods_id);
			},
			saveSearchHistory() {
				// 搜索历史去重方法
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				
				// 对搜索历史数据进行本地化存储
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			// 清理历史记录
			clean() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			// 点击标签跳转到商品详情
			gotoGoodsList(kw) {
				uni.navigateTo({
					url:'/subpkg/goods-list/goods-list?query=' + kw
				})
			}
 		},
		computed:{
			histories() {
				// 搜索历史最新数据提前方法
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 9;
	}
	
	.sugg-list {
		padding: 0 5px;
		
		.sugg-item {
			align-items: center;
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			
			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	
	.history-box {
		padding: 0 8px;
		
		.history-title {
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			font-weight: bolder;
			}
	}
	
  .history-list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 5px;
		
		.history-list-item {
				padding: 15px 10px;
	    }
	}
</style>
