import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommend = (props) => {
  const { data: userData, loading: userLoading } = useQuery(CURRENT_USER)
  const { data: bookData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: userData?.me?.favoriteGenre },
    skip: !userData?.me,
    onError: (err) => {
      console.log(err)
    }
  })

  if (!props.show) {
    return null
  }

  if (userLoading || booksLoading) {
    return <div>loading...</div>
  }

  if (!userData?.me) {
    return <div>please log in</div>
  }

  return (
    <div>
      <h2>books</h2>
      {userData && (
        <p>
          books in your favorite genre: <strong>{userData.me.favoriteGenre}</strong>
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
    </div>
  )
}

export default Recommend
