import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = ({ addBlogFormRef }) => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  return (
    <div>
      <h1>blogs</h1>
      {user !== null && (
        <div>
          <Togglable buttonLabel="new blog" ref={addBlogFormRef}>
            <BlogForm />
          </Togglable>

          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <div key={blog.id} data-testid="blog">
                <Link to={`blogs/${blog.id}`}>
                  <p>
                    {blog.title} {blog.author}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList
