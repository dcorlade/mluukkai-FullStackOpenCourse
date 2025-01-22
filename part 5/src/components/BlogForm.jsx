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
    <div className='blogFormContent'>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <label>title: </label>
        <input
          value={newBlog}
          data-testid='blog-title'
          onChange={({ target }) => setNewBlog(target.value)}
          placeholder='write blog title here'
        />
        <br />
        <label>author: </label>
        <input
          value={newAuthor}
          data-testid='blog-author'
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder='write blog author here'
        />
        <br />
        <label>url: </label>
        <input
          value={newUrl}
          data-testid='blog-url'
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder='write blog url here'
        />
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm