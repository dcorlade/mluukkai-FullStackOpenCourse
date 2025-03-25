import { useState, useEffect } from 'react'
import productService from './services/products'
import Notification from './components/Notification'
import AuthForm from './components/AuthForm'
import { notify } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeLoggedUser, loginUser, logoutUser } from './reducers/loggedUserReducer'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { AppBar, Button, Toolbar } from '@mui/material'
import ProductList from './components/ProductList'
import { initializeProducts } from './reducers/productReducer'
import Product from './components/Product'
import AddProductForm from './components/AddProductForm'
import EditProductForm from './components/EditProductForm'
import Cart from './components/Cart'

const App = () => {
  const user = useSelector(({ loggedUser }) => loggedUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(initializeProducts())
      await dispatch(initializeLoggedUser())
      await dispatch(initializeUsers())
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    if (user) {
      productService.setToken(user.token)
    }
  }, [user])

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'Username') setUsername(value)
    if (name === 'Password') setPassword(value)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to the application</h2>
      <AuthForm
        handleSubmit={handleLogin}
        handleChange={handleChange}
        values={{ username, password }}
      />
    </div>
  )

  const logoutForm = () => (
    <div>
      <form onSubmit={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <p>{user.name} logged in</p>
        <Button color="inherit" type="submit">
          logout
        </Button>
      </form>
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
      dispatch(notify('Logged in successfully', 'success', 5000))
    } catch (err) {
      console.log(err)
      dispatch(notify('Failed to login: incorrect username or password', 'err', 5000))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      dispatch(logoutUser())
      setUsername('')
      setPassword('')
      dispatch(notify('Logged out successfully', 'success', 5000))
    } catch (err) {
      console.log(err)
      dispatch(notify('Failed to logout', 'err', 5000))
    }
  }

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Products
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/cart">
              Cart ({cart.length})
            </Button>
          )}
          <div style={{ marginLeft: 'auto' }}>{user && logoutForm()}</div>
        </Toolbar>
      </AppBar>

      <Notification />

      <Routes>
        <Route path="/" element={user ? <ProductList /> : loginForm()} />
        <Route
          path="add-product"
          element={user?.role === 'admin' ? <AddProductForm /> : <Navigate to="/" />}
        />
        <Route
          path="edit-product/:id"
          element={user?.role === 'admin' ? <EditProductForm /> : <Navigate to="/" />}
        />

        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />

        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </Router>
  )
}

export default App
