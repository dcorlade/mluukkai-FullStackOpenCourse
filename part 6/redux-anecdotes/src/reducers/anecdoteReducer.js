import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      anecdoteToVote.votes++
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    sortAnecdote(state) {
      return [...state].sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { appendAnecdote, voteAnecdote, sortAnecdote, setAnecdotes } = anecdoteSlice.actions

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdotes = (id) => {
  return async (dispatch) => {
    await anecdoteService.updateVote(id)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer