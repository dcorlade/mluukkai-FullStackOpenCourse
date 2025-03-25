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
      const existingItem = state.find((item) => item.product.id === id)
      if (existingItem) {
        return state.map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      }
      console.log([...state, action.payload])
      return [...state, action.payload]
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
  return (dispatch, getState) => {
    const { cart } = getState()
    const currProduct = cart.find((p) => p.product.id === product.id)
    const currQuantity = currProduct ? currProduct.quantity : 0

    if (product.stock < currQuantity + quantity) {
      dispatch(notify('Not enough stock for this product'))
      return
    }

    dispatch(appendToCart({ product, quantity }))
    dispatch(notify('Product was added to cart!'))
  }
}

export const { appendToCart, setCart, removeFromCart, updateQuantity, clearCart } =
  cartReducer.actions

export default cartReducer.reducer
