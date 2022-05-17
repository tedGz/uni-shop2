<template>
	<view class="my-userinfo-container">
		<!-- 头像和昵称区域 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>
		
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第 1 个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>6</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>7</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>10</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第 2 个面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="../../static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="../../static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第 3 个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user', ['userinfo']),
		},
		methods:{
			...mapMutations('m_user', ['updataAddress', 'updataToken', 'updataUserInfo']),
			// 退出登录,清空数据
			clearUserinfo() {
				this.updataAddress({})
				this.updataToken('')
				this.updataUserInfo({})
			},
			async logout() {
				const [err, succ] = await uni.showModal({
					title:'提示',
					content:'确认退出登录吗?',
				}).catch(err => err)
				
				if(succ && succ.confirm) {
					this.clearUserinfo()
				}
			}
		}
	}
</script>

<style lang="scss">
	
.my-userinfo-container{
	height: 100%;
	background-color: #f4f4f4;
	.top-box {
		background-color: #c00000;
		height: 400rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		
		.avatar{
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}
		.nickname{
			padding-top: 5px;
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			margin-top: 10px;
		}
	}
	
	.panel-list{
		padding: 0 10px;
		position: relative;
		top: -10px;
		
		.panel{
			background-color: #fff;
			border-radius: 3px;
			margin-bottom: 8px;
			
			.panel-list-item{
				padding: 0 15px;
				line-height: 45px;
				font-size: 15px;
				display: flex;
				justify-content: space-between;
			}
			.panel-title {
				line-height: 45px;
				padding-left: 10px;
				font-size: 15px;
				border-bottom: 1px solid #f4f4f4;
			}
			.panel-body{
				display: flex;
				padding: 10px 0;
				justify-content: space-around;
				
				.panel-item{
					display: flex;
					flex-direction: column;	
					justify-content: space-around;
					align-items: center;
					font-size: 14px;
					
					.icon{
						width: 35px;
						height: 35px;
					}
				}
			}
		}
	}
}
</style>