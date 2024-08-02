import { ListOfProducts, ShopifyProduct } from "@/types/shopifyTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (
      state: { value: ListOfProducts },
      action: { payload: ShopifyProduct }
    ) => {
      const alreadyInState = state.value.some(
        (product: ShopifyProduct) => product.id === action.payload.id
      );

      if (alreadyInState) {
        return;
      } else {
        state.value.push(action.payload);
      }
    },
    removeItem: (
      state: { value: ListOfProducts },
      action: { payload: string }
    ) => {
      state.value = state.value.filter(
        (product: ShopifyProduct) => product.id !== action.payload
      );
    },
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
export default basketSlice.reducer;
