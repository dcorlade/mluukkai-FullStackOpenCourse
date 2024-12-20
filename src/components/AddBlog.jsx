const AddBlog = ({ newBlog, newAuthor, newUrl, handleBlogChange, handleAuthorChange, handleUrlChange, addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <label>title: </label>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <br />
      <label>author: </label>
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <br />
      <label>url: </label>
      <input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <br />
      <button type="submit">add</button>
    </form>
  )
}

export default AddBlog