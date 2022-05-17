export default {
	// 开启命名空间
	namespaced: true,
	
	// 数据
	state:() => ({
		// 用户的地址
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		token:uni.getStorageSync('token') || '',
		// 用户的信息
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null
	}),
	
	// 方法
	mutations:{
		// 更新收货地址
		updataAddress(state, address) {
			state.address = address
			
			this.commit('m_user/saveAddressToStorage')
		},
		// 本地存储 address
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 更新用户的基本信息
		updataUserInfo(state, userinfo) {
			state.userinfo = userinfo
			
			this.commit('m_user/saveUserInfo')
		},
		// 本地存储 userinfo
		saveUserInfo(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		// 更新 token
		updataToken(state, info) {
			state.token = info 
			
			this.commit('m_user/saveToken')
		},
		// 本地存储 token
		saveToken(state) {
			uni.setStorageSync('token', JSON.stringify(state.token))
		},
		// 更新重新定向的信息对象
		updataRedirectInfo(state, info) {
			state.redirectInfo = info
		}
	},
	
	getters:{
		addstr(state) {
			if(!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		},
		
	}
}