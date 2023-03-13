import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface AuthState {
  status: "Typing" | "Loading" | "Success";
  userInfo: { email: string | null };
  error: string;
  authType: "Login" | "Register";
}

export const initialState: AuthState = {
  error: "",
  status: "Typing",
  userInfo: { email: null },
  authType: "Login",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { readonly email: string; readonly password: string },
    thunkAPI
  ) => {
    try {
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      await delay(2000);
      console.log("in the async thunk");
      return { email };
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// export const registerUser = createAsyncThunk(
//   "auth/login",
//   async (
//     { email, password }: { readonly email: string; readonly password: string },
//     thunkAPI
//   ) => {
//     try {
//       const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
//       await delay(2000);
//       return { email };
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuthType: (
      state: AuthState,
      action: PayloadAction<"Login" | "Register">
    ) => {
      state.authType = action.payload;
      console.log("New authType is %s", state.authType);
    },
    error: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "Loading";
      console.log("Loading");
      state.error = "";
    });
    builder.addCase(
      loginUser.fulfilled,
      (state: AuthState, action: PayloadAction<{ email: string }>) => {
        state.status = "Success";
        state.userInfo.email = action.payload.email;
        console.log("success fulfilled", state.userInfo.email);
      }
    );
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.status = "Typing";
      state.error = payload as string;
    });
  },
});

export const { changeAuthType, error } = authSlice.actions;

export const selectAuthType = (state: RootState) => state.auth.authType;
export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
