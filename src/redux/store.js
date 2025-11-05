import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from './authSlice';
import transactionsReducer from './transactionsSlice';



export const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer, transactions: transactionsReducer, }
});