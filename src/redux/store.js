
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./Api/baseApi";
import cartReducer from "./slices/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, createTransform } from "redux-persist";

// Transform to fix corrupted cart data
const cartTransform = createTransform(
  // Transform state on its way to being serialized and persisted
  (inboundState) => {
    return inboundState;
  },
  // Transform state being rehydrated
  (outboundState) => {
    // Fix corrupted state (if it's array or undefined)
    if (!outboundState || Array.isArray(outboundState) || typeof outboundState !== 'object') {
      return { products: [], total: 0 };
    }
    
    return {
      products: Array.isArray(outboundState.products) ? outboundState.products : [],
      total: typeof outboundState.total === 'number' ? outboundState.total : 0,
    };
  },
  // Apply this transform only to 'cart' slice
  { whitelist: ['cart'] }
);

const persistConfig = {
  key: "Jewellery_website",
  storage,
  blacklist: ["baseApi"],
  transforms: [cartTransform],
  version: 3, // Increment version
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);