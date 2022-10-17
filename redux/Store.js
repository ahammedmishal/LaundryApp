import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductSlice";
import CartReducer from "./CartSlice";


const store = configureStore({
  reducer: {
    product: ProductReducer,
    cart: CartReducer
  },
});

export default store
