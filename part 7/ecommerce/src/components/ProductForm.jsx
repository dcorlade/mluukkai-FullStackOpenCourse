import { useState } from 'react'
import { createProduct } from '../reducers/productReducer'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Container, Typography, Box } from '@mui/material'

const ProductForm = () => {
  const [provider, setProvider] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addProduct = async (event) => {
    try {
      event.preventDefault()
      await dispatch(
        createProduct({
          provider,
          title,
          description,
          price: Number(price),
          stock: Number(stock),
          category
        })
      )
      dispatch(notify('Product was added successfully!'))
      navigate('/')
    } catch (error) {
      dispatch(notify('Failed to add new product', 5000))
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <Box component="form" onSubmit={addProduct} sx={{ mt: 3 }}>
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
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Product
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ProductForm
