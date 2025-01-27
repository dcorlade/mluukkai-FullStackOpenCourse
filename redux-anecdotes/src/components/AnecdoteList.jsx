import { useDispatch, useSelector } from 'react-redux'
import { sortAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => 
        anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(sortAnecdote())
        dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {dispatch(removeNotification())}, 5000)
    }

    return(
    <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}  
    </div>
    )
}

export default AnecdoteList