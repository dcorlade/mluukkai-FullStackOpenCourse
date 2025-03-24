import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Container, Typography, Box } from '@mui/material'

const ProductForm = ({ product, onSubmit, formTitle }) => {
  const navigate = useNavigate()
  const [productData, setProductData] = useState({
    provider: '',
    title: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (product) {
      setProductData({
        provider: product.provider || '',
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || '',
        imageUrl: product.imageUrl || ''
      })
    }
  }, [product])

  const handleChange = (event) => {
    const { name, value } = event.target
    setProductData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newProductData = {
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock)
    }
    await onSubmit(newProductData)
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {formTitle}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          name="provider"
          label="Provider"
          value={productData.provider}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="title"
          label="Title"
          value={productData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="description"
          label="Description"
          value={productData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          name="price"
          label="Price"
          type="number"
          value={productData.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="stock"
          label="Stock"
          type="number"
          value={productData.stock}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="category"
          label="Category"
          value={productData.category}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          name="imageUrl"
          label="Image URL"
          value={productData.imageUrl}
          onChange={handleChange}
          margin="normal"
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            {product ? 'Update Product' : 'Add Product'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(product ? `/products/${product.id}` : '/')}
            fullWidth>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ProductForm
