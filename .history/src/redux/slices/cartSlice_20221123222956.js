import { createSlice } from '@reduxjs/toolkit';

const initialState = {

}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  }
});


export const {setCategoryId} = filterSlice.actions;
export default filterSlice.reducer;
