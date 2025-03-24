import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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

  return (
    <div>
      <h2>Products</h2>
      {user?.role === 'admin' && (
        <Button
          component={Link}
          to="/add-product"
          variant="contained"
          color="primary"
          style={{ marginBottom: 20 }}>
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
              <TableRow key={product.id}>
                <TableCell>{product.provider}</TableCell>
                <TableCell>
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </TableCell>
                <TableCell align="right">{product.price} RON</TableCell>
                <TableCell align="right">
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
