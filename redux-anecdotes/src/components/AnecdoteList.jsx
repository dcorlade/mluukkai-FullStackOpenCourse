import { useDispatch, useSelector } from 'react-redux'
import { sortAnecdote, voteAnecdotes } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => 
        anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())))
    const dispatch = useDispatch()

    const vote = async (id) => {
        await dispatch(voteAnecdotes(id))
        dispatch(sortAnecdote())
        dispatch(notify(`You voted '${anecdotes.find(a => a.id === id).content}'`, 5000))
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