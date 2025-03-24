import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateProduct } from '../reducers/productReducer'
import { notify } from '../reducers/notificationReducer'
import { Button, TextField, Container, Typography, Box } from '@mui/material'

const EditProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const product = useSelector((state) => state.products.find((p) => p.id === id))

  const [provider, setProvider] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (product) {
      setProvider(product.provider)
      setTitle(product.title)
      setDescription(product.description || '')
      setPrice(product.price)
      setStock(product.stock)
      setCategory(product.category || '')
      setImageUrl(product.imageUrl || '')
    }
  }, [product])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(
        updateProduct(id, {
          provider,
          title,
          description,
          price: Number(price),
          stock: Number(stock),
          category,
          imageUrl
        })
      )
      dispatch(notify('Product updated successfully', 'success', 5000))
      navigate(`/products/${id}`)
    } catch (error) {
      dispatch(notify('Failed to update product', 'error', 5000))
    }
  }

  if (!product) {
    return null
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Provider"
          value={provider}
          onChange={({ target }) => setProvider(target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={({ target }) => setPrice(target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Stock"
          type="number"
          value={stock}
          onChange={({ target }) => setStock(target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Category"
          value={category}
          onChange={({ target }) => setCategory(target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Image URL"
          value={imageUrl}
          onChange={({ target }) => setImageUrl(target.value)}
          margin="normal"
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Update Product
          </Button>
          <Button variant="outlined" onClick={() => navigate(`/products/${id}`)} fullWidth>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default EditProductForm
