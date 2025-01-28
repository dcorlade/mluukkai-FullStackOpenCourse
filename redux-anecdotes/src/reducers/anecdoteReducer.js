import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      anecdoteToVote.votes++
    },
    createAnecdote(state, action) {
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


export const { createAnecdote, voteAnecdote, sortAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer