import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  idx: 1,
  info:null,
}

export const detailPaginationSlice = createSlice({
  name: 'detailPagination',
  initialState,
  reducers: {
    setIdx: (state, action) => {
        state.idx = action.payload;
      },
    increment: (state) => {
    
      state.idx += 1
    },
    decrement: (state) => {
      state.idx -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const {setIdx, increment, decrement } = detailPaginationSlice.actions

export default detailPaginationSlice.reducer