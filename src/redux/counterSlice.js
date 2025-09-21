import { createSlice } from "@reduxjs/toolkit";


const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0, step: 1 },
  reducers: {
    increment: (state) => {
      if (state.count + state.step <= 100) {   // condition
        state.count += state.step;
      }
    },
    decrement: (state) => { state.count -= 1; },
    reset: (state) => { state.count = 0; },
    setStep: (state, action) => { state.step = action.payload; }

  }
})
export const { increment, decrement, reset, setStep } = counterSlice.actions;
export default counterSlice.reducer;

