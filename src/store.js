import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../src/features/cart/cartSlice";

const loadCart = () => {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : undefined;
  } catch (e) {
    console.error("Failed to load cart", e);
    return undefined;
  }
};

const preloadedItems = loadCart();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: preloadedItems
    ? { cart: { items: preloadedItems, orderPlaced: false } }
    : undefined,
});

store.subscribe(() => {
  try {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
  } catch (e) {
    console.error("Failed to save cart", e);
  }
});

export default store;
