import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('user'),
  loading: false,
  error: null,
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },


    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },

    deleteUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },

  },
});

export const { login, logout, signup, updateUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;