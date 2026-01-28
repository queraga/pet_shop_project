import { createSlice } from "@reduxjs/toolkit";

const findIndexById = (items, id) => items.findIndex((x) => x.id === id);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    orderPlaced: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const idx = findIndexById(state.items, product.id);

      state.orderPlaced = false;

      if (idx >= 0) {
        state.items[idx].qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((x) => x.id !== id);
    },
    incrementQty: (state, action) => {
      const id = action.payload;
      const idx = findIndexById(state.items, id);
      if (idx >= 0) {
        state.items[idx].qty += 1;
      }
    },

    decrementQty: (state, action) => {
      const id = action.payload;
      const idx = findIndexById(state.items, id);
      if (idx >= 0) {
        state.items[idx].qty -= 1;
      }
      if (state.items[idx].qty <= 0) {
        state.items = state.items.filter((x) => x.id !== id);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    placeOrder: (state) => {
      state.orderPlaced = true;
    },

    resetOrderPlaced: (state) => {
      state.orderPlaced = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
  placeOrder,
  resetOrderPlaced,
} = cartSlice.actions;

export default cartSlice.reducer;
