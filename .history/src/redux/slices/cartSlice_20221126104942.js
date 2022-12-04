import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: []
}

const filterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
  }
}); 


export const { addProduct } = filterSlice.actions;
export default filterSlice.reducer;
