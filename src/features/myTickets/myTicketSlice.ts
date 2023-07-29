import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { _ProjectBug } from "../common/types";

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

const dummyBugs: _ProjectBug[] = [
    {
        name: "Bug 1",
        id: "1",
        description: "Sample Bug Description",
        priority: "High",
        status: "Open",
        created: "2020-10-10",
        updated: "2020-10-10",
        type: "bug",
        assignee: "Mary",
        project: "Project-5",
    },
    {
        name: "Bug 2",
        id: "2",
        description: "Sample Bug Description",
        priority: "Medium",
        status: "Open",
        created: "2020-10-10",
        updated: "2020-10-10",
        type: "bug",
        assignee: "Mary",
        project: "Project-2",
    },
    {
        name: "Bug 3",
        id: "3",
        description: "Sample Bug Description",
        priority: "Low",
        status: "Open",
        created: "2020-10-10",
        updated: "2020-10-10",
        type: "bug",
        assignee: "Mary",
        project: "Project-3",
    },
    {
        name: "Bug 4",
        id: "4",
        description: "Sample Bug Description",
        priority: "High",
        status: "Open",
        created: "2020-10-10",
        updated: "2020-10-10",
        type: "bug",
        assignee: "John",
        project: "Project-4",
    }
];

export const fetchMyTickets = createAsyncThunk(
    "myTickets/fetchMyTickets",
    async (id: string, thunkAPI) => {
        try {
            const filteredBugs = dummyBugs.filter((bug) => bug.assignee?.includes(id));
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
