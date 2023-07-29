import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { _ProjectBug } from "../common/types";
import { listByUser as fetchBugs } from "./api-bugs";

interface _MyTicketsState {
    myTickets: _ProjectBug[];
    loading: boolean;
    error?: string | null;
};

const initialState: _MyTicketsState = {
    myTickets: [],
    loading: false,
    error: null,
};

export const fetchMyTickets = createAsyncThunk(
    "myTickets/fetchMyTickets",
    async ({ userId, jwt, signal }: { userId: string, jwt: string, signal: any }, thunkAPI) => {
        try {
            console.log("fetchMyTickets", { userId, jwt, signal });
            const credentials = { t: jwt };
            const filteredBugs = await fetchBugs(userId, credentials, signal);
            console.log("filteredBugs", filteredBugs);
            return filteredBugs;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const myTicketsSlice = createSlice({
    name: "myTickets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMyTickets.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchMyTickets.fulfilled, (state, action) => {
            state.myTickets = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchMyTickets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const selectMyTickets = (state: RootState) => state.myTickets.myTickets;
export const selectMyTicketsLoading = (state: RootState) => state.myTickets.loading;
export const selectMyTicketsError = (state: RootState) => state.myTickets.error;

export default myTicketsSlice.reducer;
