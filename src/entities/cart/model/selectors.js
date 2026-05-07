export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + (item.qty || 0), 0);

const getCurrentPrice = (item) => {
  const price = Number(item.price) || 0;
  const discount = Number(item.discont_price) || 0;
  return discount > 0 ? discount : price;
};

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => {
    const qty = Number(item.qty) || 0;
    return sum + getCurrentPrice(item) * qty;
  }, 0);
