import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const {
    data: bookData,
    loading,
    refetch
  } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })

  const filterAllBooks = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const genres = [...new Set(filterAllBooks.data.allBooks.flatMap((book) => book.genres))].sort()

  const filterBooks = (genre) => {
    setSelectedGenre(genre)
    refetch({
      genre: genre
    })
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre && (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookData.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: '0.5em', marginTop: '1em' }}>
        {genres.map((genre) => (
          <button key={genre} onClick={() => filterBooks(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => filterBooks(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
