import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, showButton }) => {
  const [newLike, setNewLike] = useState(blog.likes)

  const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const putBlog = (event) => {
    event.preventDefault()
    const updatedLikes = newLike + 1
    setNewLike(updatedLikes)
    updateBlog(blog.id, { ...blog, likes: updatedLikes })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex', flexDirection:'column' }}>
        <p style={{ margin: 0 }}>{blog.title} {blog.author}</p>
        <Togglable buttonLabel='view'>
          <div>
            <p>{blog.url}</p>
            <p>
              likes {newLike}
              <button onClick={putBlog}>like</button>
            </p>
            <p>{blog.user.name}</p>
            {
              showButton && <button onClick={deleteBlog}>remove</button>
            }
          </div>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog