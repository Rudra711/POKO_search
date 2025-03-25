import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 0,
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    increment: (state) => {
    
      state.page += 20
    },
    decrement: (state) => {
      state.page -= 20
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = paginationSlice.actions

export default paginationSlice.reducer