import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: {
    Logged: false,
    id: "",
    name: "",
  
  },
  reducers: {
    userLoggingIn: (state, action) => {
      const {id,name, phone,email,address} = action.payload
      state.Logged = true;
      state.id = id;
      state.name = name;
    },
    userLoggingOut: (state) => {
        localStorage.removeItem("user")
      state.Logged = false;
      state.id = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoggingIn, userLoggingOut } = counterSlice.actions;

export default counterSlice.reducer;
