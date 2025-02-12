import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import AuthForm from './components/AuthForm'
import { notify } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {
  const user = useSelector(({ user }) => user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [user])

  const addBlogFormRef = useRef()

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'Username') setUsername(value)
    if (name === 'Password') setPassword(value)
  }

  const authForm = () =>
    user === null ? (
      <div>
        <h2>Log in to the application</h2>
        <AuthForm
          handleSubmit={handleLogin}
          handleChange={handleChange}
          values={{ username, password }}
        />
      </div>
    ) : (
      <div>
        <form onSubmit={handleLogout}>
          <p style={{ display: 'inline', marginRight: '10px' }}>{user.name} logged in</p>
          <button type="submit" style={{ display: 'inline' }}>
            logout
          </button>
        </form>
      </div>
    )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser(username, password))
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

  const showButton = (blog) => {
    return user && user.username === blog.user.username
  }

  return (
    <Router>
      <Notification />
      {authForm()}
      <Routes>
        <Route
          path="/"
          element={<BlogList addBlogFormRef={addBlogFormRef} showButton={showButton} />}
        />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  )
}

export default App
