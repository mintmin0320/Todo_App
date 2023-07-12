import { createSlice } from '@reduxjs/toolkit'

import data from '../../data.json'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: { todoArr: data },
  reducers: {
    todo: (state, action) => {
      state.todoArr = action.payload;
    }
  },
})

export const { todo } = todoSlice.actions;
export default todoSlice.reducer;