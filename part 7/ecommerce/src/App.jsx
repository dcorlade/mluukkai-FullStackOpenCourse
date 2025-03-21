import { useState, useEffect } from 'react'
import productService from './services/products'
import Notification from './components/Notification'
import AuthForm from './components/AuthForm'
import { notify } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeLoggedUser, loginUser, logoutUser } from './reducers/loggedUserReducer'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import Blog from './components/Blog'
import { AppBar, Button, Toolbar } from '@mui/material'
import Products from './components/Products'
import ProductForm from './components/ProductForm'
import { initializeProducts } from './reducers/productReducer'

const App = () => {
  const user = useSelector(({ loggedUser }) => loggedUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      // await dispatch(initializeBlogs())
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
          <div style={{ display: 'flex', gap: '1em' }}>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          </div>
          <div style={{ marginLeft: 'auto' }}>{user && logoutForm()}</div>
        </Toolbar>
      </AppBar>

      <Notification />

      <Routes>
        <Route path="/" element={user ? <Products /> : loginForm()} />
        <Route
          path="add-product"
          element={user?.role === 'admin' ? <ProductForm /> : <Navigate to="/" />}
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
