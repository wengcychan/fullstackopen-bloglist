import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload.returnedBlog
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      dispatch(appendBlog(returnedBlog))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
    } catch (exception) {
      dispatch(setNotification('missing title or url'))
    }
  }
}

export const removeBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogToDelete.id)
      dispatch(deleteBlog(blogToDelete.id))
      dispatch(setNotification(`blog ${blogToDelete.title} by ${blogToDelete.author} removed`))
    } catch (exception) {
      dispatch(setNotification('invalid token'))
    }
  }
}

export const addLikes = (newBlogObject, id) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(newBlogObject, id)
    dispatch(updateBlog({ returnedBlog, id }))
    dispatch(
      setNotification(`likes of blog ${returnedBlog.title} by ${returnedBlog.author} increased`)
    )
  }
}

export const addComments = (newBlogObject, id) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(newBlogObject, id)
    dispatch(updateBlog({ returnedBlog, id }))
    dispatch(
      setNotification(`comment of blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    )
  }
}

export default blogSlice.reducer
