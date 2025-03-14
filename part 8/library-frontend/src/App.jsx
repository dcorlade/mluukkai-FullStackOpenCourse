import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    setToken(localStorage.getItem('books-user-token'))
  }, [])

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null ? (
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      {token && <NewBook show={page === 'add'} />}
      {token && <Recommend show={page === 'recommend'} />}

      <LoginForm setToken={setToken} show={page === 'login'} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />
    </div>
  )
}

export default App
