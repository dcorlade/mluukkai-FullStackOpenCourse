import { createSlice } from '@reduxjs/toolkit'
import { notify } from './notificationReducer'

const cartReducer = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart(state, action) {
      return action.payload
    },
    appendToCart(state, action) {
      const id = action.payload.product.id

      const existingItem = state.find((item) => {
        item.product.id === id
      })
      if (existingItem) {
        return state.map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      }
      state.push(action.payload)
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.product.id !== action.payload)
    },
    updateQuantity(state, action) {
      return state.map((item) =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
    },
    clearCart() {
      return []
    }
  }
})

export const addToCart = (product, quantity) => {
  return (dispatch) => {
    const itemToAdd = { product, quantity }
    console.log('quantity ' + quantity)
    dispatch(appendToCart(itemToAdd))
    dispatch(notify('Product was added to cart!'))
  }
}

export const { appendToCart, setCart, removeFromCart, updateQuantity, clearCart } =
  cartReducer.actions

export default cartReducer.reducer
