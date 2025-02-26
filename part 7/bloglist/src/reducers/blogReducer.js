import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      return action.payload
    },
    voteBlog(state, action) {
      const id = action.payload
      const blog = state.find((blog) => blog.id === id)
      if (blog) {
        blog.likes += 1
      }
    },
    removeBlog(state, action) {
      const id = action.payload
      state.filter((blog) => blog.id !== id)
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = (id) => {
  return async (dispatch, getState) => {
    dispatch(voteBlog(id))
    const updatedBlog = getState().blogs.find((blog) => blog.id === id)
    await blogService.update(id, updatedBlog)
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const { appendBlog, setBlog, voteBlog, removeBlog } = blogReducer.actions

export default blogReducer.reducer
