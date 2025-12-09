import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, loginUser, logoutUser, signupUser } from "./authThunk";
import { REHYDRATE } from "redux-persist";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  rehydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
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
        return {
          ...state,
          ...action.payload.auth,
          rehydrated: true,
          loading: false,
          error: null,
        };
      }
      state.rehydrated = true;
      state.loading = false;
    });

    // 🔥 SIGNUP
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false; // 🔥 Firebase logs in automatically after signup
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    });

    // 🔥 LOGIN
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
      state.isLoggedIn = false;
    });

    // 🔥 LOGOUT
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // 🔥 FETCH PROFILE
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
      state.user = null;
      state.isLoggedIn = false;
    });
  },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;