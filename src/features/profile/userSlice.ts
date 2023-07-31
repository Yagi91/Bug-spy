import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { list, read, update } from "./api-user";

interface UserState {
    user: User;
    users: Users;
    loading: boolean;
    error: string;
}

interface User {
    name: string;
    email: string;
    role: string;
    _id: string;
}

type Users = User[];

const initialState: UserState = {
    user: {
        name: "",
        email: "",
        role: "",
        _id: "",
    },
    users: [],
    loading: false,
    error: "",
};



export const getUser = createAsyncThunk(
    "user/getUser",
    async (userId: string, thunkAPI) => {
        try {
            const token = sessionStorage.getItem("jwt")?.toString() || '';//get the token from the session storage
            const credentials = { t: JSON.parse(token as string) };//convert the token to JSON
            const controller = new AbortController();
            const signal = controller.signal;
            const user = await read({ userId: userId }, credentials, signal);
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (user: User, thunkAPI) => {
        try {
            const token = sessionStorage.getItem("jwt")?.toString() || '';
            const credentials = { t: JSON.parse(token as string) };
            const updatedUser = await update({ userId: user._id }, credentials, user);
            return updatedUser;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId: string, thunkAPI) => {
        try {
            const deletedUser = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await deletedUser.json();
            if (data.error) { throw new Error(data.error) }
            console.log(data);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async (signal: any, thunkAPI) => {
        try {
            const users = await list(signal);
            return users;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = {
                name: "",
                email: "",
                role: "",
                _id: "",
            };
        },
        clearError: (state) => {
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.loading = false;
        });
        builder.addCase(getUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.loading = false;
        });
        builder.addCase(updateUser.rejected, (state, { payload }) => {
            // if payload string contains 11000 error code, then the email is already taken
            if (payload?.toString().includes("11000")) {
                state.error = "Email is already taken";
            } else {
                state.error = payload as string;
            }
            state.loading = false;
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.loading = false;
        });
        builder.addCase(deleteUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });
        builder.addCase(getUsers.pending, (state) => {
            state.users = [];
            state.loading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.users = payload;
            state.loading = false;
        });
        builder.addCase(getUsers.rejected, (state, { payload }) => {
            state.users = [];
            state.loading = false;
            state.error = payload as string;
        });
    }
});


export const { clearUser, clearError } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUsers = (state: RootState) => state.user.users;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;