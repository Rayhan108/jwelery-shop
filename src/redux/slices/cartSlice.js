
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total: 0,
};

// Helper to ensure we have valid state structure
const getValidState = (state) => {
  if (!state || Array.isArray(state) || typeof state !== 'object') {
    return null; // Signal that state is corrupted
  }
  return state;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartForNavigate: (state, action) => {
      // Check if state is corrupted (is an array)
      if (Array.isArray(state)) {
        return {
          products: [{ ...action.payload, quantity: 1, size: action.payload.size || null }],
          total: action.payload.discount_price || action.payload.price || 0,
        };
      }

      const product = action.payload;

      if (!product || !product._id) {
        console.error("Invalid product:", product);
        return state;
      }

      // Ensure products array exists
      if (!Array.isArray(state.products)) {
        state.products = [];
      }
      if (typeof state.total !== "number") {
        state.total = 0;
      }

      const existingIndex = state.products.findIndex(
        (item) => item._id === product._id
      );

      const price = product.discount_price || product.price || 0;

      if (existingIndex !== -1) {
        state.products[existingIndex].quantity += 1;
      } else {
        state.products.push({
          ...product,
          quantity: 1,
          size: product.size || null,
        });
      }

      state.total += price;
    },

    addToCart: (state, action) => {
      // Check if state is corrupted
      if (Array.isArray(state)) {
        return {
          products: [{ ...action.payload, quantity: 1, size: action.payload.size || null }],
          total: action.payload.discount_price || action.payload.price || 0,
        };
      }

      const product = action.payload;

      if (!product || !product._id) return state;

      if (!Array.isArray(state.products)) {
        state.products = [];
      }
      if (typeof state.total !== "number") {
        state.total = 0;
      }

      const existingIndex = state.products.findIndex((p) => p._id === product._id);
      const price = product.discount_price || product.price || 0;

      if (existingIndex !== -1) {
        state.products[existingIndex].quantity += 1;
      } else {
        state.products.push({
          ...product,
          quantity: 1,
          size: product.size || null,
        });
      }

      state.total += price;
    },

    removeFromCart: (state, action) => {
      if (Array.isArray(state)) {
        return { products: [], total: 0 };
      }

      const product = action.payload;

      if (!product || !product._id) return state;
      if (!Array.isArray(state.products)) return state;

      const existingIndex = state.products.findIndex((p) => p._id === product._id);

      if (existingIndex !== -1 && state.products[existingIndex].quantity > 1) {
        state.products[existingIndex].quantity -= 1;
        const price = product.discount_price || product.price || 0;
        state.total -= price;
      }

      if (state.total < 0) state.total = 0;
    },

    deleteOneProduct: (state, action) => {
      if (Array.isArray(state)) {
        return { products: [], total: 0 };
      }

      const product = action.payload;

      if (!product || !product._id) return state;
      if (!Array.isArray(state.products)) return state;

      const existingIndex = state.products.findIndex((p) => p._id === product._id);

      if (existingIndex !== -1) {
        const existing = state.products[existingIndex];
        const price = existing.discount_price || existing.price || 0;
        state.total -= price * existing.quantity;
        state.products.splice(existingIndex, 1);
      }

      if (state.total < 0) state.total = 0;
    },

    clearCart: () => {
      return { products: [], total: 0 };
    },

    updateQuantity: (state, action) => {
      if (Array.isArray(state)) {
        return { products: [], total: 0 };
      }

      if (!Array.isArray(state.products)) return state;

      const { _id, quantity } = action.payload;
      const existingIndex = state.products.findIndex((p) => p._id === _id);

      if (existingIndex !== -1) {
        const existing = state.products[existingIndex];
        const price = existing.discount_price || existing.price || 0;
        const oldQuantity = existing.quantity;
        const newQuantity = Math.max(1, quantity);

        state.total += (newQuantity - oldQuantity) * price;
        state.products[existingIndex].quantity = newQuantity;
      }
    },

    updateColor: (state, action) => {
      if (Array.isArray(state)) {
        return {
          products: [{ ...action.payload, quantity: 1 }],
          total: action.payload.discount_price || action.payload.price || 0,
        };
      }

      const product = action.payload;

      if (!product || !product._id) return state;
      if (!Array.isArray(state.products)) {
        state.products = [];
      }

      const existingIndex = state.products.findIndex((p) => p._id === product._id);

      if (existingIndex !== -1) {
        state.products[existingIndex].color = product.color;
      } else {
        state.products.push({ ...product, quantity: 1 });
        const price = product.discount_price || product.price || 0;
        state.total += price;
      }
    },

    updateSize: (state, action) => {
      if (Array.isArray(state)) {
        return {
          products: [{ ...action.payload, quantity: 1 }],
          total: action.payload.discount_price || action.payload.price || 0,
        };
      }

      const product = action.payload;

      if (!product || !product._id) return state;
      if (!Array.isArray(state.products)) {
        state.products = [];
      }

      const existingIndex = state.products.findIndex((p) => p._id === product._id);

      if (existingIndex !== -1) {
        state.products[existingIndex].size = product.size;
      } else {
        state.products.push({ ...product, quantity: 1 });
        const price = product.discount_price || product.price || 0;
        state.total += price;
      }
    },
  },
});

export const {
  addToCartForNavigate,
  removeFromCart,
  addToCart,
  clearCart,
  deleteOneProduct,
  updateQuantity,
  updateColor,
  updateSize,
} = cartSlice.actions;

export default cartSlice.reducer;