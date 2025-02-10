import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AuthForm from './components/AuthForm'
import { useQuery } from '@tanstack/react-query'
import blogService from './services/blogs'
import { useUser } from './contexts/UserContext'
import { useNotify } from './contexts/NotificationContext'

const App = () => {
  const { user, login, logout } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notify = useNotify()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false
  })
  const blogs = result.data
  console.log(blogs)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await login(username, password)
      setUsername('')
      setPassword('')
      notify({ message: 'Logged in', type: 'success' })
    } catch (error) {
      notify({ message: 'Error logging in', type: 'err' })
      console.log(error)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      await logout()
      notify({ message: 'Logged out', type: 'success' })
    } catch (error) {
      notify({ message: 'Error logging out', type: 'err' })
      console.log(error)
    }
  }

  const showButton = (blog) => {
    return user && user.username === blog.user.username
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

  return (
    <div>
      <Notification />
      {authForm()}
      {user !== null && (
        <div>
          <Togglable buttonLabel="new blog" ref={addBlogFormRef}>
            <BlogForm />
          </Togglable>

          <div>
            <h2>blogs</h2>
            {result.isLoading && <p>Loading blogs...</p>}
            {result.isError && <p>Error loading blogs</p>}
            {result.isSuccess &&
              blogs &&
              blogs.map((blog) => (
                <div key={blog.id} data-testid="blog">
                  <Blog blogId={blog.id} showButton={showButton(blog)} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
