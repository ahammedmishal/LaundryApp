import {createSlice} from '@reduxjs/toolkit';

const ProductSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProducts(state, action) {
      state.push(action.payload);
    },
    increaseQty(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload) {
          myindex = index;
        }
      });
      if (myindex == -1) {
      } else {
        state[myindex].qty = state[myindex].qty + 1;
      }
    },
    decreaseQty(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload) {
          myindex = index;
        }
      });
      if (myindex == -1) {
      } else {
        state[myindex].qty = state[myindex].qty - 1;
      }
    },
  },
});

export const {addProducts,increaseQty,decreaseQty} = ProductSlice.actions;
export default ProductSlice.reducer;
