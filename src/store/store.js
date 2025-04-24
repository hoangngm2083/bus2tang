import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Sử dụng Session Storage
import bookingReducer from "./bookingSlice";

// Cấu hình Redux Persist
const persistConfig = {
  key: "root", // Key lưu trong Session Storage
  storage: storageSession, // Sử dụng Session Storage
};

const persistedReducer = persistReducer(persistConfig, bookingReducer);

// Tạo Redux Store
export const store = configureStore({
  reducer: {
    booking: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Bỏ qua kiểm tra serializable cho Redux Persist
      },
    }),
});

// Tạo Persistor để sử dụng với PersistGate
export const persistor = persistStore(store);
