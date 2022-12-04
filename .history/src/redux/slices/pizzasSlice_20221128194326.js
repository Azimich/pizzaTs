// import React from 'react';

// const pizzasSlice = () => {
//   return (
//     <div>pizzasSlice</div>
//   )
// }

// export default pizzasSlice;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: []
}

const pizzasSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {}
  }
}); 


export const { addItem, removeItem, minusItem, clearItem } = pizzasSlice.actions;
export default pizzasSlice.reducer;
