import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import AuthForm from './components/AuthForm'
import { notify } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLoggedUser, loginUser, logoutUser } from './reducers/loggedUserReducer'
import BlogList from './components/BlogList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import Blog from './components/Blog'

const App = () => {
  const user = useSelector(({ loggedUser }) => loggedUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeLoggedUser())
    dispatch(initializeUsers())
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

  return (
    <Router>
      <Notification />
      {authForm()}
      <Routes>
        <Route path="/" element={<BlogList addBlogFormRef={addBlogFormRef} />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
