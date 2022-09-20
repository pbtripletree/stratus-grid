import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./userAPI";

const initialState = {
  username: "",
  token: "",
  status: "idle",
  loginError: "",
  registerError: "",
};

export const login = createAsyncThunk("user/loginUser", async (info) => {
  const { email, password } = info;
  if (!email || !password) throw "email or password is empty";
  return loginUser(email, password);
});

export const register = createAsyncThunk("user/registerUser", async (info) => {
  const { username, email, password } = info;
  if (!email || !password || !email) throw "complete all fields";
  return registerUser(username, email, password);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.username = action.payload.username;
        state.token = action.payload.token;
        if (state.loginError) state.loginError = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
        state.loginError = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "idle";
        state.username = action.payload.username;
        state.token = action.payload.token;
        if (state.registerError) state.registerError = "";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "idle";
        state.registerError = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUsername = (state) => {
  return state.user.username;
};

export const selectToken = (state) => {
  return state.user.token;
};

export const selectLoginError = (state) => {
  return state.user.loginError;
};

export const selectRegisterError = (state) => {
  return state.user.registerError;
};

export default userSlice.reducer;
