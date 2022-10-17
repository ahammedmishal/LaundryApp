import {createSlice} from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProductToCart(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myindex = index;
        }
      });
      if (myindex == -1) {
        state.push({
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.name,
          brand: action.payload.brand,
          price: action.payload.price,
          qty: action.payload.qty + 1,
        });
      } else {
        state[myindex].qty = state[myindex].qty + 1;
      }
    },
    removeProductFromCart(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myindex = index;
        }
      });
      if (myindex == -1) {
      } else {
        state[myindex].qty = state[myindex].qty - 1;
      }
    },
    deleteCartItem(state, action) {
      return (state = state.filter(item => {
        item.id !== action.payload;
      }));
    },
  },
});

export const {addProductToCart, removeProductFromCart, deleteCartItem} =
  CartSlice.actions;
export default CartSlice.reducer;
