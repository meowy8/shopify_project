import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/productsSlice";
import basketReducer from "../redux/basketSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
