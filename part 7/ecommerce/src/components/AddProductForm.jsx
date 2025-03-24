import { createProduct } from '../reducers/productReducer'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import ProductForm from './ProductForm'

const AddProductForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addProduct = async (product) => {
    try {
      await dispatch(createProduct(product))
      dispatch(notify('Product was added successfully!'))
      navigate('/')
    } catch (error) {
      dispatch(notify('Failed to add new product', 5000))
    }
  }

  return <ProductForm onSubmit={addProduct} formTitle={'Add Product'} />
}

export default AddProductForm
