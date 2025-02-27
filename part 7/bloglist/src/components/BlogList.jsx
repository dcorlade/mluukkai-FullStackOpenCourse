import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

const BlogList = ({ addBlogFormRef }) => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  return (
    <div>
      <h1>blogs app</h1>
      {user !== null && (
        <div>
          <Togglable buttonLabel="new blog" ref={addBlogFormRef}>
            <BlogForm />
          </Togglable>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id} data-testid="blog">
                    <TableCell>
                      <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell align="right">{blog.author}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  )
}

export default BlogList
