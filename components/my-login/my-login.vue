<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @click="getUserProfile">一键登录</button>
		<text class="tips-text">登陆后尽享更多权益</text>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updataUserInfo', 'updataToken', 'updataRedirectInfo']),
			// 用户授权之后,获取用户基本信息
			async getUserProfile() {
				const [err, res] = await uni.getUserProfile({
					desc:"登录",
				})
				
				if(res.errMsg === 'getUserProfile:ok') uni.$showMsg('登录成功')
				
				this.updataUserInfo(res.userInfo)
				
				this.getToken(res)
			},
			async getToken(info) {
				// 获取 code 对应的值
				const [err, res] = await uni.login().catch(err => err)
				
				console.log(res.code);
				
				// 准备参数对象
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				
				// 换取 token
				const {data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				
				if(loginResult.meta.status !== 200)  uni.$showMsg('登陆成功！')
				
				// 模拟获取 token 的值
				this.updataToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
				this.navigateBack()
			},
			navigateBack() {
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url:this.redirectInfo.from,
						complete:() => {
							this.updataRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
  .login-container{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		
		.contact-filled{
		}
		.btn-login{
			padding: 0 150px;
			border-radius: 30px;
			margin-top: 20px;
			background-color: black;
		}
		.tips-text{
			padding-top: 15px;
			font-size: 12px;
			color: gray;
		}
	}
</style>