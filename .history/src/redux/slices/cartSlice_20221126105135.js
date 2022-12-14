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
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id === action.payload);
    },
    clearItem(state, action) {
      state.items = state.items.filter((obj) => obj.id === action.payload);
    },
  }
}); 


export const { addProduct } = filterSlice.actions;
export default filterSlice.reducer;
