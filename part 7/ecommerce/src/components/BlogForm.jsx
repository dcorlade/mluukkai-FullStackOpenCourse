import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      await dispatch(createBlog({ title: newBlog, author: newAuthor, url: newUrl }))
      dispatch(notify(`a new blog ${newBlog} by ${newAuthor} added`, 'success', 5000))
      setNewBlog('')
      setNewAuthor('')
      setNewUrl('')
    } catch (err) {
      console.log(err)
      dispatch(notify('failed to add blog', 5000))
    }
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
