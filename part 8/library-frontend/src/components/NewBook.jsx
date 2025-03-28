import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, CREATE_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    // update: (cache, response) => {
    //   cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    //     return {
    //       allBooks: allBooks.concat(response.data.addBook)
    //     }
    //   })
    // },
    refetchQueries: [
      // {
      //   query: ALL_BOOKS,
      //   variables: { genre: null } // Refetch unfiltered books
      // },
      // {
      //   query: ALL_BOOKS // Also refetch the filtered view if any
      // },
      {
        query: ALL_AUTHORS
      }
    ],
    onError: (error) => {
      console.log(error)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    console.log('add book...')
    const publishedInt = parseInt(published)
    createBook({ variables: { title, published: publishedInt, author, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
