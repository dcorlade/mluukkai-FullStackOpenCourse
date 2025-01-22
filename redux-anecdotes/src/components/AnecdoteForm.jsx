import { useDispatch } from 'react-redux'
import { actionCreateAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(actionCreateAnecdote(content))
  }
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" /> 
        <button type="submit">create</button>
      </form>
    </div>
    
  )
}

export default AnecdoteForm