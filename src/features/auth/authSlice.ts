import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { create } from "../profile/api-user";
import { signin } from "./api-auth";
import { auth } from "./auth-helper";

export interface AuthState {
  status: "Typing" | "Loading" | "Success";
  userInfo: { email: string | null; name?: string | null; role?: string };
  error: string;
  authType: "Login" | "Register";
  userToken: JSON | null | string;
}
const userToken = JSON.parse(localStorage.getItem("userToken") || "{}");

const initialState: AuthState = {
  error: "",
  status: "Typing",
  userInfo: { email: null, name: null, role: "" },
  authType: "Login",
  userToken,
};

// export interface SerializedError {
//   name?: string
//   message?: string
//   stack?: string
//   code?: string
// }

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; readonly password: string },
    thunkAPI
  ) => {
    try {
      const user = await signin({ email, password });
      console.log("in the async thunk");
      console.log(user);
      if (user.error) { throw new Error(user.error) }
      return user;
    } catch (error: any) {
      console.log("in here");
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password, name, role }: { email: string; name: string; role: string; password: string },
    thunkAPI
  ) => {
    try {
      // const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      const data = await create({ email, password, name, role });
      // await delay(2000);
      // return { email, name, role };
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeAuthType: (//Change the type of authentication between login and register
      state: AuthState,
      action: PayloadAction<"Login" | "Register">
    ) => {
      state.authType = action.payload;
      console.log("New authType is %s", state.authType);
    },
    error: (state: AuthState, action: PayloadAction<string>) => {//Handle errors
      state.error = action.payload;
    },
    logout: (state: AuthState) => {
      state.userInfo.email = null;
      state.error = "";
      state.status = "Typing";
      state.userToken = null;
      localStorage.removeItem("userToken");
    },//Handle logout
  },
  extraReducers(builder) {
    //Handle async actions for login and register
    builder.addCase(loginUser.pending, (state) => {
      state.status = "Loading";
      console.log("Loading");
      state.error = "";
    });
    builder.addCase(
      loginUser.fulfilled,
      (state: AuthState, action: PayloadAction<{ email: string, role: string, name: string, token: string }>) => {
        auth.authenticate(action.payload.token, () => {
          state.userInfo.email = action.payload.email;
          state.userInfo.name = action.payload.name;
          state.userInfo.role = action.payload.role;
          state.userToken = action.payload.token;
          state.status = "Success";
        });
        console.log("success fulfilled", state.userInfo);
      }
    );
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.status = "Typing";
      state.error = payload as string;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = "Loading";
      console.log("Loading");
      state.error = "";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "Success";
      state.userInfo.email = action.payload.email;
      console.log("success fulfilled", state.userInfo.email);
      state.userInfo.name = action.payload.name;
      state.userInfo.role = action.payload.role;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.status = "Typing";
      state.error = payload as string;
    });
  },
});

export const { changeAuthType, error } = authSlice.actions;

export const selectAuthType = (state: RootState) => state.auth.authType;
export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
