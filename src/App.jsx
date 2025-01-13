import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AuthForm from './components/AuthForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const timeoutIdRef = useRef(null)

  const addBlogFormRef = useRef()

  const showNotification = (message, type) => {
    setNotifMessage(message)
    setNotifType(type)
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    timeoutIdRef.current = setTimeout(() => {
      setNotifMessage(null)
      setNotifType('')
    }, 5000)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'Username') setUsername(value)
    if (name === 'Password') setPassword(value)
  }

  const authForm = () => (
    user === null ? (
      <div>
        <h2>Log in to the application</h2>
        <AuthForm handleSubmit={handleLogin} handleChange={handleChange} values={{ username, password }} />
      </div>
    ) : (
      <div>
        <form onSubmit={handleLogout}>
          <p style={{ display: 'inline', marginRight: '10px' }}>
            {user.name} logged-in
          </p>
          <button type="submit" style={{ display: 'inline' }}>logout</button>
        </form>
      </div>
    )
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log('Logging in')
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('Logged in successfully', 'success')
    } catch (err) {
      console.log(err)
      showNotification('Failed to login: incorrect username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogappUser')

      setUser(null)
      setUsername('')
      setPassword('')
      showNotification('Logged out successfully', 'success')
    } catch (err) {
      console.log(err)
      showNotification('Failed to logout', 'error')
    }
  }

  const addBlog = async (blogObject) => {
    try {
      addBlogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showNotification('Added a blog successfully', 'success')
    } catch (error) {
      console.log(error)
      showNotification('Failed to add blog', 'error')
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      showNotification('Updated a blog successfully', 'success')
    } catch (error) {
      console.log(error)
      showNotification('Failed to update blog', 'error')
    }
  }

  const removeBlog = async (id) => {
    try {
      if (window.confirm('Are you sure you want to remove this blog?')) {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        showNotification('Removed a blog successfully', 'success')
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.error.includes('user not allowed')) {
        showNotification('You are not allowed to remove this blog as you are not the owner', 'error')
      }
      else {
        showNotification('Failed to remove blog', 'error')
      }

    }
  }

  return (
    <div>
      <Notification message={notifMessage} type={notifType} />
      {authForm()}
      {user !== null &&
        <div>
          <Togglable buttonLabel='new blog' ref={addBlogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>

          <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <div key={blog.id}>
                <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
              </div>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App