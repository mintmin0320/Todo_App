import { createSlice } from '@reduxjs/toolkit'

import data from '../../data.json'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: { value: data },
  reducers: {
    todo: (state, action) => {
      state.value = action.payload;
    }
  },
})

export const { todo } = todoSlice.actions;
export default todoSlice.reducer;