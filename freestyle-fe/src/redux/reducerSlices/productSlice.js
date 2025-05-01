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
    changeWishList: (state, actions) => {
      const existingWishList = state.wishList || []; // Default to an empty array if state.wishList is undefined
      const incomingWishList = actions.payload || []; // Default to an empty array if actions.payload is undefined

      // Convert the existingWishList and incomingWishList to sets to handle unique values
      const existingSet = new Set(existingWishList.map((item) => item._id));
      const incomingSet = new Set(incomingWishList.map((item) => item._id));

      // Merge the sets to maintain uniqueness
      const mergedSet = new Set([...existingSet, ...incomingSet]);

      // Convert the mergedSet back to an array
      const mergedWishList = Array.from(mergedSet).map((id) => {
        return (
          existingWishList.find((item) => item._id === id) ||
          incomingWishList.find((item) => item._id === id)
        );
      });

      return {
        ...state,
        wishList: mergedWishList,
      };
    },
    addWishList: (state, actions) => {
      const existingWishList = [...state.wishList];
      const incomingItem = actions.payload;

      // Check if the item already exists in the wishlist
      const isItemInWishlist = existingWishList.some(
        (item) => item._id === incomingItem._id
      );

      if (isItemInWishlist) {
        // If the item exists, remove it from the wishlist
        const updatedWishlist = existingWishList.filter(
          (item) => item._id !== incomingItem._id
        );

        return {
          ...state,
          wishList: updatedWishlist,
        };
      } else {
        // If the item doesn't exist, add it to the wishlist
        return {
          ...state,
          wishList: [...existingWishList, incomingItem],
        };
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
    logoutRemove: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  addCartList,
  deleteProductFromCart,
  decrement,
  increment,
  addWishList,
  changeWishList,
  logoutRemove,
} = productSlice.actions;
export default productSlice.reducer;
