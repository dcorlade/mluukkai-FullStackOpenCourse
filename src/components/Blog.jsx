import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{blog.title} {blog.author}</span>
        <Togglable buttonLabel='view' style={{ marginLeft: '30px' }}>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button>like</button>
          </p>
          <p>{blog.user.name}</p>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog