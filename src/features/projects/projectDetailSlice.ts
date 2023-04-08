import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


interface _ProjectDetails {
    name: string;
    description: string;
    admin: string;
    progress: string;
    created: string;
    updated: string;
}

interface _ProjectMembers {
    name: string;
    email: string;
    role: string;
}

interface _ProjectBugs {
    name: string;
    id: string;
    description: string;
    priority: string;
    status: string;
    created: string;
    updated: string;
}

export interface ProjectDetailsState {
    projectDetails: _ProjectDetails | null;
    projectMembers: _ProjectMembers[];
    projectBugs: _ProjectBugs[];
    loading: boolean;
    error?: string | null;
}
const dummyDetails: _ProjectDetails = {
    name: "Project Name",
    description: "Sample Project Description",
    admin: "Mary",
    progress: "Ongoing",
    created: "2020-10-10",
    updated: "2020-10-10",
};

const dummyMembers: _ProjectMembers[] = [
    {
        name: "Mary",
        email: "mary@workexample.com",
        role: "Admin",
    },
    {
        name: "John",
        email: "john@workexample.com",
        role: "Developer",
    },
    {
        name: "Bob",
        email: "bob@workexample.com",
        role: "Developer",
    },
    {
        name: "Jane",
        email: "jane@workexample.com",
        role: "Developer",
    },];

const dummyBugs: _ProjectBugs[] = [
    {
        name: "Bug 1",
        description: "Sample Bug Description",
        priority: "High",
        status: "Ongoing",
        created: "2020-10-10",
        updated: "2020-10-10",
        id: "1",
    },
    {
        name: "Bug 2",
        id: "2",
        description: "Sample Bug Description",
        priority: "Medium",
        status: "Ongoing",
        created: "2020-10-10",
        updated: "2020-10-10",
    },
]

const initialState: ProjectDetailsState = {
    projectDetails: null,
    projectMembers: [],
    projectBugs: [],
    loading: true,
    error: null,
};


export const getProjectDetails = createAsyncThunk(
    "projectDetails/getProjectDetails",
    async (projectId: string, thunkAPI) => {
        try {
            const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
            await delay(2000);
            return { projectId };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const projectDetailsSlice = createSlice({
    name: "projectDetails",
    initialState,
    reducers: {
        setProjectDetails: (state, action: PayloadAction<_ProjectDetails>) => {
            state.projectDetails = action.payload;
        },
        setProjectMembers: (state, action: PayloadAction<_ProjectMembers[]>) => {
            state.projectMembers = action.payload;
        },
        setProjectBugs: (state, action: PayloadAction<_ProjectBugs[]>) => {
            state.projectBugs = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProjectDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getProjectDetails.fulfilled, (state, action) => {
            state.projectDetails = dummyDetails;
            state.projectMembers = dummyMembers;
            state.projectBugs = dummyBugs;
            state.loading = false;
        });
        builder.addCase(getProjectDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { setProjectDetails, setProjectMembers, setProjectBugs, setLoading } = projectDetailsSlice.actions;

export const selectProjectDetails = (state: RootState) => state.projectDetails.projectDetails;
export const selectProjectMembers = (state: RootState) => state.projectDetails.projectMembers;
export const selectProjectBugs = (state: RootState) => state.projectDetails.projectBugs;
export const selectLoading = (state: RootState) => state.projectDetails.loading;
export const selectError = (state: RootState) => state.projectDetails.error;

export default projectDetailsSlice.reducer;
