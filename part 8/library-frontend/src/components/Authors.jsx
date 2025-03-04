import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [birth, setBirth] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    console.log('change author...')
    const birthInt = parseInt(birth)
    editAuthor({ variables: { name: selectedOption.value, setBornTo: birthInt } })
    setBirth('')
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const options = authors.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name
  }))
  if (authors.data.allAuthors) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
          <div>
            born
            <input value={birth} onChange={({ target }) => setBirth(target.value)} />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    )
  }
}

export default Authors
