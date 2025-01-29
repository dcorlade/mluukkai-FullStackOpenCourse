import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (err) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: err.response.data.error })
      setTimeout(() => {notificationDispatch({ type: 'SET_NOTIFICATION', payload: null })}, 5000)
    }
   })

  const onCreate = (event) => {

    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: `new anecdote ${content} created` })
    setTimeout(() => {notificationDispatch({ type: 'SET_NOTIFICATION', payload: null })}, 5000)
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
