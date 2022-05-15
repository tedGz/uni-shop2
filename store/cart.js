export default {
	namespaced:true,
	
	state:() => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations: {
		// 添加到购物车
		addToCart(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			
			this.commit('m_cart/saveToStorage')
		},
		// 储存到本地
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新商品的勾选状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult) {
				findResult.goods_state = goods.goods_state
				
				// 储存到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult) {
				findResult.goods_count = goods.goods_count
				
				this.commit('m_cart/saveToStorage')
			}
		},
		// 根据id删除商品
		removeGoodsById(state, goods) {
			state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			
			this.commit('m_cart/saveToStorage') 
		},
		
		// 全选状态改变
		updataAllCheck(state, isCheck) {

			state.cart.forEach(x => x.goods_state = !isCheck)
			
			this.commit('m_cart/saveToStorage')
		},
		
		
	},
	
	getters: {
		// 购物车中所有商品的总数量
		total(state) {
			// let c = 0
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			
			return state.cart.reduce((total, item) => total += item.goods_count , 0)
		},
		
		// 选中商品的总数量
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		
		// 已勾选商品总价格
		checkedTotalPrice(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_price * item.goods_count, 0).toFixed(2)
		}
	}
}