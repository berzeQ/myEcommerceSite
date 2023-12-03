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
      const incomingCart = actions.payload;

      const existingItem = existingCartList.find(
        (item) => item._id === incomingCart._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        existingCartList.push({ ...incomingCart, quantity: 1 });
        state.cartList = existingCartList;
      }
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
    increment: (state, actions) => {
      const existingCartList = [...state.cartList];
      const incomingCart = actions.payload;

      const existingItem = existingCartList.find(
        (item) => item._id === incomingCart._id
      );
      existingItem ? existingItem.quantity++ : "";
    },
    decrement: (state, actions) => {
      const existingCartList = [...state.cartList];
      const incomingCart = actions.payload;

      const existingItem = existingCartList.find(
        (item) => item._id === incomingCart._id
      );
      if (existingItem.quantity !== 1) {
        existingItem.quantity--;
      }
    },
  },
});

export const { addCartList, deleteProductFromCart, decrement, increment } =
  productSlice.actions;
export default productSlice.reducer;
