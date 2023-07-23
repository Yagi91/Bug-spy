import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { _ProjectBug } from "../common/types";
import { getProject } from "./api-projects";


interface _ProjectSummary {
    name: string;
    description: string;
    admin: string;
    progress: string;
    created: string;
    updated: string;
    id: string;
}

interface _ProjectMembers {
    name: string;
    email: string;
    role: string;
}


export interface ProjectDetailsState {
    projectSummary: _ProjectSummary | null;
    projectMembers: _ProjectMembers[];
    projectBugs: _ProjectBug[];
    loading: boolean;
    error?: string | null;
}
const dummySummary: _ProjectSummary = {
    name: "Project Name",
    description: "Sample Project Description",
    admin: "Mary",
    progress: "Ongoing",
    created: "2020-10-10",
    updated: "2020-10-10",
    id: '737Hj9292jnd'
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

const dummyBugs: _ProjectBug[] = [
    {
        name: "Bug 1",
        description: "Sample Bug Description",
        priority: "High",
        status: "Open",
        created: "2020-10-10",
        updated: "2020-10-10",
        id: "1",
    },
    {
        name: "Bug 2",
        id: "2",
        description: "Sample Bug Description",
        priority: "Medium",
        status: "Close",
        created: "2020-10-10",
        updated: "2020-10-10",
    },
]

const initialState: ProjectDetailsState = {
    projectSummary: null,
    projectMembers: [],
    projectBugs: [],
    loading: true,
    error: null,
};


export const getProjectDetails = createAsyncThunk(
    "projectDetails/getProjectDetails",
    async (projectName: string, thunkAPI) => {
        try {
            const project = await getProject({ projectId: `details/${projectName}` });
            console.log(project);
            // return { projectName };
            return project;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const projectDetailsSlice = createSlice({
    name: "projectDetails",
    initialState,
    reducers: {
        setProjectDetails: (state, action: PayloadAction<_ProjectSummary>) => {
            state.projectSummary = action.payload;
        },
        setProjectMembers: (state, action: PayloadAction<_ProjectMembers[]>) => {
            state.projectMembers = action.payload;
        },
        setProjectBugs: (state, action: PayloadAction<_ProjectBug[]>) => {
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
            const project: _ProjectSummary = {
                name: action.payload.name,
                description: action.payload.description,
                admin: action.payload.admin,
                progress: action.payload.progress,
                created: action.payload.created,
                updated: action.payload.updated,
                id: action.payload.id,
            };
            const bugs: _ProjectBug[] = action.payload.bugs.map((bug: any) => {
                return {
                    name: bug.name,
                    description: bug.description,
                    priority: bug.priority,
                    status: bug.status,
                    created: bug.created,
                    updated: bug.updated,
                    id: bug.id,
                };
            });
            state.projectSummary = project;
            state.projectMembers = dummyMembers;
            state.projectBugs = bugs;
            state.loading = false;
        });
        builder.addCase(getProjectDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { setProjectDetails, setProjectMembers, setProjectBugs, setLoading } = projectDetailsSlice.actions;

export const selectProjectSummary = (state: RootState) => state.projectDetails.projectSummary;
export const selectProjectMembers = (state: RootState) => state.projectDetails.projectMembers;
export const selectProjectBugs = (state: RootState) => state.projectDetails.projectBugs;
export const selectLoading = (state: RootState) => state.projectDetails.loading;
export const selectError = (state: RootState) => state.projectDetails.error;

export default projectDetailsSlice.reducer;
