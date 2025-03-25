import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../reducers/cartReducer'
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box,
  TextField,
  ButtonGroup
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleQuantityChange = (productId, quantity = 1) => {
    const newQuantity = isNaN(quantity) || quantity === null ? 1 : quantity
    dispatch(updateQuantity({ productId, quantity: newQuantity }))
  }

  const roundNumberToDecimals = (number, decimalsLen) => {
    return parseFloat(number).toFixed(decimalsLen)
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Paper sx={{ p: 2 }}>
          <Typography>Your cart is empty</Typography>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={item.product.imageUrl || 'https://picsum.photos/seed/picsum/800'}
                          alt={item.product.title}
                          sx={{ width: 50, height: 50, marginRight: 2, objectFit: 'cover' }}
                        />
                        <Typography>{item.product.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{item.product.price} RON</TableCell>
                    <TableCell align="right">
                      <ButtonGroup size="small" sx={{ marginRight: -4 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          disabled={item.quantity === 1}>
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={item.quantity || 1}
                          onChange={(e) =>
                            handleQuantityChange(item.product.id, parseInt(e.target.value))
                          }
                          sx={{
                            width: '65px',
                            transition: 'width 0.2s',
                            textAlign: 'center'
                          }}
                          slotProps={{
                            htmlInput: {
                              style: { textAlign: 'center' },
                              maxLength: 4
                            }
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          disabled={item.quantity === 9999}>
                          <AddIcon />
                        </IconButton>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell align="right">
                      {roundNumberToDecimals(
                        item.product.price * item.quantity || item.product.price,
                        2
                      )}{' '}
                      RON
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                        color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="outlined" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
            <Box>
              <Typography variant="h6">
                Total: {roundNumberToDecimals(totalPrice, 2)} RON
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  )
}

export default Cart
