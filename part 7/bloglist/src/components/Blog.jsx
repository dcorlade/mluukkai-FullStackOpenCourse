import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from './Comments'

const Blog = () => {
  const navigate = useNavigate()
  const user = useSelector(({ loggedUser }) => loggedUser)
  const blogId = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === blogId))
  const dispatch = useDispatch()

  if (!user || !blog) return null

  const showButton = () => {
    return user && user.username === blog.user.username
  }

  const putBlog = async (event) => {
    event.preventDefault()
    try {
      await dispatch(updateBlog(blogId))
      dispatch(notify('Liked a blog successfully', 'success', 5000))
    } catch (e) {
      console.log(e)
      dispatch(notify('Failed to like blog', 'error', 5000))
    }
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm('Are you sure you want to remove this blog?')) {
        await dispatch(deleteBlog(blogId))
        dispatch(notify('Removed a blog successfully', 'success', 5000))
        navigate('/')
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

  return (
    <div>
      <div>
        <br></br>
        <h1 style={{ marginRight: 'auto' }} data-testid="title">
          {blog.title} {blog.author}
        </h1>
        <br></br>
        <div>
          <a href={blog.url}>{blog.url}</a>
          <p data-testid="likes">
            likes {blog.likes}
            <button onClick={putBlog}>like</button>
          </p>
          <p>added by {blog.user.name}</p>
          {showButton() && <button onClick={removeBlog}>remove</button>}
        </div>
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default Blog
