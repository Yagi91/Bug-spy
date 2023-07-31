import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { create, read } from "../profile/api-user";
import { signin } from "./api-auth";
import { auth } from "./auth-helper";

export interface AuthState {
  status: "Idle" | "Loading" | "Success";
  userInfo: { email: string | null; name?: string | null; role?: string | null, _id?: string | null };
  error: string;
  authType: "Login" | "Register";
  userToken: JSON | null | string;
}
// const userToken = JSON.parse(sessionStorage.getItem("userToken") || "{}");
const userToken = sessionStorage.getItem("jwt")?.toString() || null;

const initialState: AuthState = {
  error: "",
  status: "Idle",
  userInfo: { email: null, name: null, role: "", _id: "" },
  authType: "Login",
  userToken,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password, jwt }: { email: string; readonly password: string; jwt?: string },
    thunkAPI
  ) => {
    try {
      const user = await signin({ email, password, jwt });
      console.log("in the async thunk");
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

export const loginWithJWT = createAsyncThunk(
  "auth/loginWithJWT",
  async (jwt: string, thunkAPI) => {
    try {
      const userId = JSON.parse(atob(jwt.split(".")[1]))._id;
      const controller = new AbortController();
      const signal = controller.signal;
      const user = await read({ userId: userId }, { t: jwt }, signal);
      if (user.error) { throw new Error(user.error) }
      user.token = jwt;
      return user;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);




export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password, name, role }: { email: string; name: string; role: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await create({ email, password, name, role });
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
      console.log("Logging out");
      try {
        auth.clearJWT(() => {
          state.userInfo.email = null;
          state.userInfo.name = null;
          state.userInfo.role = null;
          state.userInfo._id = null;
          state.error = "";
          state.status = "Idle";
          state.userToken = null;
        });
      } catch (error: any) {
        console.log(error);
        state.error = error;
      }
    },
    setUserInfo: (state: AuthState, action: PayloadAction<{ email: string, role: string, name: string, _id: string }>) => {
      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;
      state.userInfo.role = action.payload.role;
      state.userInfo._id = action.payload._id;
    },
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
      (state: AuthState, action: PayloadAction<{ email: string, role: string, name: string, token: string, _id: string }>) => {
        console.log(' in the login user fulfilled ');
        auth.authenticate(action.payload.token, () => {
          state.userInfo.email = action.payload.email;
          state.userInfo.name = action.payload.name;
          state.userInfo.role = action.payload.role;
          state.userInfo._id = action.payload._id;
          state.userToken = action.payload.token;
          state.status = "Success";
        });
        console.log("success fulfilled", state.userInfo);
      }
    );
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.status = "Idle";
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
      state.status = "Idle";
      state.error = payload as string;
    });

    builder.addCase(loginWithJWT.pending, (state) => {
      state.status = "Loading";
      console.log("Loading");
      state.error = "";
    }
    );
    builder.addCase(loginWithJWT.fulfilled, (state, action) => {
      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;
      state.userInfo.role = action.payload.role;
      state.userInfo._id = action.payload._id;
      state.userToken = action.payload.token;
      state.status = "Success";
      console.log("success fulfilled", state.userInfo);
    }
    );
    builder.addCase(loginWithJWT.rejected, (state, { payload }) => {
      state.status = "Idle";
      state.error = payload as string;
    }
    );

  },
});

export const { changeAuthType, error, logout, setUserInfo } = authSlice.actions;

export const selectAuthType = (state: RootState) => state.auth.authType;
export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
