import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotifitcaion(state, action) {
      return action.payload
    }
  }
})

export const { showNotifitcaion } = notificationSlice.actions

export const setNotification = (message) => {
  return (dispatch) => {
    dispatch(showNotifitcaion(message))
    setTimeout(() => dispatch(showNotifitcaion(null)), 5000)
  }
}

export default notificationSlice.reducer
