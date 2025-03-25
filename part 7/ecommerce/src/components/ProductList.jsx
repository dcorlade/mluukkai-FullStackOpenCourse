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
  Box
} from '@mui/material'
import { addToCart } from '../reducers/cartReducer'

const ProductList = () => {
  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.loggedUser)
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  // const addProductToCart = (e, product) => {
  //   e.stopPropation()
  //   dispatch(addToCart(product))
  // }

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
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={(e) => e.stopPropagation()}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductList
