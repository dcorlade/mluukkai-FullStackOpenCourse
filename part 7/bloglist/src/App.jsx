import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AuthForm from './components/AuthForm'
import { notify } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
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
      console.log('Logging in')
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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
      window.localStorage.removeItem('loggedBlogappUser')

      setUser(null)
      setUsername('')
      setPassword('')
      dispatch(notify('Logged out successfully', 'success', 5000))
    } catch (err) {
      console.log(err)
      dispatch(notify('Failed to logout', 'err', 5000))
    }
  }

  const addBlog = async (blogObject) => {
    try {
      addBlogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      returnedBlog.user = user
      setBlogs(blogs.concat(returnedBlog))
      dispatch(notify('Added a new blog successfully', 'success', 5000))
    } catch (error) {
      console.log(error)
      dispatch(notify('Failed to add a new blog', 'error', 5000))
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      console.log('likes: ' + blogObject.likes)
      const updatedBlog = await blogService.update(id, blogObject)
      console.log(updatedBlog)
      const updatedBlogs = blogs.map((blog) => (blog.id !== id ? blog : updatedBlog))
      console.log(updatedBlogs)
      updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs([...updatedBlogs])
      dispatch(notify('Updated a blog successfully', 'success', 5000))
    } catch (error) {
      console.log(error)
      dispatch(notify('Failed to update blog', 'error', 5000))
    }
  }

  const removeBlog = async (id) => {
    try {
      if (window.confirm('Are you sure you want to remove this blog?')) {
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        dispatch(notify('Removed a blog successfully', 'success', 5000))
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.error.includes('user not allowed')) {
        dispatch(notify('You are not allowed to remove this blog', 'error', 5000))
      } else {
        dispatch(notify('Failed to remove blog', 'error', 5000))
      }
    }
  }

  const showButton = (blog) => {
    return user && user.username === blog.user.username
  }

  return (
    <div>
      <Notification />
      {authForm()}
      {user !== null && (
        <div>
          <Togglable buttonLabel="new blog" ref={addBlogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <div key={blog.id} data-testid="blog">
                <Blog
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                  showButton={showButton(blog)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
