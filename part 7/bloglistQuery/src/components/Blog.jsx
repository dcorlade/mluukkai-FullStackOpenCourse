import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'

const Blog = ({ blogId, showButton }) => {
  const { data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false
  })
  const blog = blogs.find((blog) => blog.id === blogId)
  const queryClient = useQueryClient()
  const notify = useNotify()
  const voteMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify({ message: 'Liked a blog successfully', type: 'success' })
    },
    onError: (error) => {
      console.error(error)
      notify({ message: 'Failed to like a blog', type: 'error' })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notify({ message: 'Deleted a blog successfully', type: 'success' })
    },
    onError: (error) => {
      console.error(error)
      notify({ message: 'Failed to delete a blog', type: 'error' })
    }
  })

  const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const putBlog = async (event) => {
    event.preventDefault()
    voteMutation.mutate({ id: blogId, updatedBlog: { ...blog, likes: blog.likes + 1 } })
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to remove this blog?')) {
      deleteMutation.mutate(blogId)
    }
  }

  return (
    <div>
      {blog && (
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
      )}
    </div>
  )
}

export default Blog
