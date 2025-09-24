import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCartForNagivate: (state, action) => {
      const existing = state.products.find(product => product._id === action.payload._id);
      if (existing) {
        existing.quantity = existing.quantity;
      } else {
        action.payload.size = null;
        state.products.push({ ...action.payload, quantity: 1 });
        const price = action.payload.discount_price ? action.payload.discount_price : action.payload.price;
        state.total += price;
      }

    },
    addToCart: (state, action) => {
      const existing = state.products.find(product => product._id === action.payload._id);
      if (existing) {
        existing.quantity = existing.quantity + 1;
      } else {
        action.payload.size = null;
        state.products.push({ ...action.payload, quantity: 1 });
      }
      const price = action.payload.discount_price ? action.payload.discount_price : action.payload.price;
      state.total += price;
    },

    removeFromCart: (state, action) => {
      const existing = state.products.find(product => product._id === action.payload._id);
      if (existing && existing.quantity > 1) {
        // Reduce quantity by 1 if more than 1 item exists
        existing.quantity -= 1;
        state.total -= action.payload.discount_price ? action.payload.discount_price : action.payload.price;
      } else if (existing && existing.quantity === 1) {
        // Do nothing if quantity is 1
        return;
      }

      // Update the total price (whether quantity was reduced or not)
      // state.total -= action.payload.discount_price ? action.payload.discount_price : action.payload.price;
    },

    deleteOneProduct: (state, action) => {
      const existing = state.products.find(product => product._id === action.payload._id);
      if (existing) {
        const price = existing.discount_price ? existing.discount_price : existing.price;
        state.total -= price * existing.quantity;
        state.products = state.products.filter(product => product._id !== action.payload._id);
      }
    },

    clearCart: () => {
      return [];
    },
    updateQuantity: (state, action) => {
      // const item = state.find((item) => item._id === action.payload._id);
      // if (item) {
      //   item.quantity = Math.max(0, action.payload.quantity);
      // } else {
      //   state.push({ ...action.payload, quantity: Math.max(0, action.payload.quantity) });
      // }
    },
    updateColor: (state, action) => {
      const existing = state.products.find(product => product._id === action.payload._id);
      if (existing) {
        existing.color = action.payload.color;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        const price = action.payload.discount_price ? action.payload.discount_price : action.payload.price;
        state.total += price;
      }
    },
    updateSize: (state, action) => {
      const existing = state.products.find(product => product._id === action.payload._id);
      if (existing) {
        existing.size = action.payload.size;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        const price = action.payload.discount_price ? action.payload.discount_price : action.payload.price;
        state.total += price;
      }
    }
  },
});

export const {
  addToCartForNagivate,
  removeFromCart,
  addToCart,
  clearCart,
  deleteOneProduct,
  updateQuantity,
  updateColor,
  updateSize,
} = cartSlice.actions;

export default cartSlice.reducer;
