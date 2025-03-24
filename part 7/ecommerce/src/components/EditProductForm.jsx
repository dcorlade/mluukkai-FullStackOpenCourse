import { editProduct as updateProduct } from '../reducers/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from './ProductForm'

const EditProductForm = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const product = useSelector((state) => state.products.find((p) => p.id === id))

  const editProduct = async (productData) => {
    try {
      await dispatch(updateProduct(id, productData))
      dispatch(notify('Product updated successfully!'))
      navigate(`/products/${id}`)
    } catch (error) {
      dispatch(notify('Failed to update product', 5000))
    }
  }

  return <ProductForm product={product} onSubmit={editProduct} formTitle={'Edit Product'} />
}

export default EditProductForm
