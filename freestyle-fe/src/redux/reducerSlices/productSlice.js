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
      const existingCartList = [...state.cartList];
      existingCartList.push(actions.payload);
      state.cartList = existingCartList;
    },
    deleteProductFromCart: (state, actions) => {
      console.log(actions.payload._id, "sagar");
      // state.cartList.splice(actions.payload._id, 1);
      state.cartList = state.cartList.filter((item) => {
        if (item._id !== actions.payload._id) {
          return item;
        }
      });
    },
  },
});

export const { addCartList, deleteProductFromCart } = productSlice.actions;
export default productSlice.reducer;
