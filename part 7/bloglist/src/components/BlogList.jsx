import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({ addBlogFormRef, showButton }) => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  return (
    <div>
      {user !== null && (
        <div>
          <Togglable buttonLabel="new blog" ref={addBlogFormRef}>
            <BlogForm />
          </Togglable>

          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
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

export default BlogList
