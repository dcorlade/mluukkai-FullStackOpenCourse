import { createSlice } from '@reduxjs/toolkit'
import productService from '../services/products'

const productReducer = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts(state, action) {
      return action.payload
    },
    appendProduct(state, action) {
      state.push(action.payload)
    },
    removeProduct(state, action) {
      const id = action.payload
      return state.filter((product) => product.id !== id)
    },
    updateProduct(state, action) {
      const updatedProduct = action.payload
      return state.map((product) => (product.id !== updatedProduct.id ? product : updatedProduct))
    }
  }
})

export const initializeProducts = () => {
  return async (dispatch) => {
    const products = await productService.getAll()
    dispatch(setProducts(products))
  }
}

export const createProduct = (product) => {
  console.log('creating product...  ', product)
  return async (dispatch) => {
    const newProduct = await productService.create(product)
    dispatch(appendProduct(newProduct))
  }
}

export const editProduct = (id, product) => {
  console.log('updating product...')
  return async (dispatch) => {
    const updatedProduct = await productService.update(id, product)
    dispatch(updateProduct(updatedProduct))
  }
}

export const deleteProduct = (id) => {
  console.log('deleting product...')
  return async (dispatch) => {
    await productService.remove(id)
    dispatch(removeProduct(id))
  }
}

export const { setProducts, appendProduct, removeProduct, updateProduct } = productReducer.actions

export default productReducer.reducer
