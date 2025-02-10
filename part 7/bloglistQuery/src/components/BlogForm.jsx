import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const notify = useNotify()

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNewBlog('')
      setNewAuthor('')
      setNewUrl('')
      notify({ message: `A new blog "${newBlog}" by ${newAuthor} added`, type: 'success' })
    },
    onError: (error) => {
      console.error(error)
      notify({ message: 'Failed to add blog', type: 'error' })
    }
  })

  const addBlog = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title: newBlog, author: newAuthor, url: newUrl })
  }

  return (
    <div className="blogFormContent">
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <label>title: </label>
        <input
          value={newBlog}
          data-testid="blog-title"
          onChange={({ target }) => setNewBlog(target.value)}
          placeholder="write blog title here"
        />
        <br />
        <label>author: </label>
        <input
          value={newAuthor}
          data-testid="blog-author"
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder="write blog author here"
        />
        <br />
        <label>url: </label>
        <input
          value={newUrl}
          data-testid="blog-url"
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder="write blog url here"
        />
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm
