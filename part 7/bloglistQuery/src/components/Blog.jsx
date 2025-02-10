import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blog = ({ blogId, showButton }) => {
  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === blogId))
  const dispatch = useDispatch()
  const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
    <div style={blogStyle}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ margin: 0 }} data-testid="title">
          {blog.title} {blog.author}
        </p>
        <Togglable buttonLabel="view">
          <div>
            <p>{blog.url}</p>
            <p data-testid="likes">
              likes {blog.likes}
              <button onClick={putBlog}>like</button>
            </p>
            <p>{blog.user.name}</p>
            {showButton && <button onClick={removeBlog}>remove</button>}
          </div>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
