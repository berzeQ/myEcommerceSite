import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  wishList: [],
  cartList: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addCartList: (state, actions) => {
      debugger;
      const existingCartList = [...state.cartList];
      existingCartList.push(actions.payload);
      state.cartList = existingCartList;
    },
  },
});

export const { addCartList } = productSlice.actions;
export default productSlice.reducer;
