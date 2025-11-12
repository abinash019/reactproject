import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile, loginUser, signupUser } from "./authThunk";
import { REHYDRATE } from "redux-persist";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  rehydrated: false, // ✅ new flag
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {

    builder.addCase(REHYDRATE, (state, action) => {
      if (action.payload?.auth) {
        state.loading = false;
        state.error = null;
        state.rehydrated = true;
        state.isLoggedIn = !!action.payload.auth.user; // add this line
        state.user = action.payload.auth.user || null;
      }
    });

    // Signup
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = false;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
