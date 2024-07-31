import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getProducts } = productsSlice.actions;
export default productsSlice.reducer;
