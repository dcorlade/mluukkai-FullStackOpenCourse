import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid2 as Grid,
  Box,
  IconButton,
  TextField,
  ButtonGroup
} from '@mui/material'
import { addToCart } from '../reducers/cartReducer'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const ProductList = () => {
  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.loggedUser)
  const [quantities, setQuantities] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getQuantity = (productId) => quantities[productId] || 1

  const handleQuantityChange = (id, quantity) => {
    setQuantities({
      ...quantities,
      [id]: quantity
    })
  }

  const addProductToCart = (product) => {
    const quantity = getQuantity(product.id)
    console.log(quantity)
    dispatch(addToCart(product, quantity))
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {user?.role === 'admin' && (
        <Button
          component={Link}
          to="/add-product"
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}>
          Add New Product
        </Button>
      )}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={4} key={product.id}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': { boxShadow: 6 },
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              onClick={() => navigate(`/products/${product.id}`)}>
              <CardMedia
                component="img"
                height="180"
                image={product.image || 'https://picsum.photos/seed/picsum/800'}
                alt={product.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Provider: {product.provider}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                  {product.price} RON
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                  onClick={(e) => e.stopPropagation()}>
                  <ButtonGroup size="small">
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(product.id, getQuantity(product.id) - 1)}
                      disabled={getQuantity(product.id) === 1}>
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      size="small"
                      value={getQuantity(product.id)}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                      sx={{
                        width: `${Math.max(50, getQuantity(product.id).toString().length * 20)}px`,
                        transition: 'width 0.2s',
                        textAlign: 'center'
                      }}
                      slotProps={{
                        htmlInput: {
                          maxLength: 4,
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(product.id, getQuantity(product.id) + 1)}
                      disabled={getQuantity(product.id) >= 9999}>
                      <AddIcon />
                    </IconButton>
                  </ButtonGroup>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => addProductToCart(product)}>
                    Add
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductList
