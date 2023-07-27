import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { list, read } from "./api-user";

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
            const state = thunkAPI.getState() as RootState;
            const credentials = { t: state.auth.userToken };
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
            const updatedUser = await fetch(`http://localhost:5000/api/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = await updatedUser.json();
            return data;
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
        });
        builder.addCase(updateUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.loading = false;
        });
        builder.addCase(updateUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
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


export const { clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;