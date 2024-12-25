import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <label>title: </label>
        <input
          value={newBlog}
          onChange={({ target }) => setNewBlog(target.value)}
        />
        <br />
        <label>author: </label>
        <input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        <br />
        <label>url: </label>
        <input
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm