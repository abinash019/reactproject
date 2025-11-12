import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from './authSlice';
import transactionsReducer from './transactionsSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist only auth slice
  blacklist: ["auth.loading", "auth.error"], // <-- do not persist loading/error
};


const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  transactions: transactionsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // prevent persist non-serializable warning
    }),
});

export const persistor = persistStore(store);
