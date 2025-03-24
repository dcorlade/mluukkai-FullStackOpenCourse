import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'

const ProductList = () => {
  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.loggedUser)
  const navigate = useNavigate()

  return (
    <div>
      <h2>Products</h2>
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Provider</TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                hover
                sx={{
                  cursor: 'pointer',
                  '&:hover td': { backgroundColor: 'grey.100' }
                }}
                onClick={() => navigate(`/products/${product.id}`)}>
                <TableCell>{product.provider}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell align="right">{product.price} RON</TableCell>
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  <Button variant="contained" color="primary" size="small">
                    Add to Cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductList
