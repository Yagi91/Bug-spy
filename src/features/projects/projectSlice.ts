import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ListProjectsProps } from "./listProjects";

const defaultProjects: ListProjectsProps[] = [
    {
        name: "Mary",
        bugs: 1,
        Created: "2021-01-01",
        admin: "Mary",
        progress: "Completed",
    },
    {
        name: "John",
        bugs: 2,
        Created: "2021-02-01",
        admin: "John",
        progress: "Ongoing",
    },
    {
        name: "Bob",
        bugs: 3,
        Created: "2021-03-01",
        admin: "Bob",
        progress: "Completed",
    },
    {
        name: "Jane",
        bugs: 4,
        Created: "2021-04-01",
        admin: "Jane",
        progress: "Ongoing",
    },
]

export interface ProjectState {
    projects: ListProjectsProps[] | [];
    sort: "Name" | "Most bugs" | "Newest" | "Admin";
    filterStatus: "All" | "Completed" | "Ongoing";
    filterOwner: "All Projects" | "My Projects";
}

const initialState: ProjectState = {
    projects: [],
    sort: "Name",
    filterStatus: "All",
    filterOwner: "All Projects",
}

export const fetchProjects = createAsyncThunk(
    "project/fetchProjects",
    async (action, thunkAPI) => {
        //check if email exists in the database first before fetching projects
        try {
            const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
            await delay(2000);
            // const response = await fetch("http://localhost:3000/projects");
            // const data = await response.json();
            // return data;
            return defaultProjects;
        }
        catch (error: any) {
            if (error.response && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        sortProjects: (state, action: PayloadAction<string>) => {
            state.sort = action.payload as ProjectState["sort"];
        },
        filterProjectsStatus: (state, action: PayloadAction<string>) => {
            state.filterStatus = action.payload as ProjectState["filterStatus"];
        },
        filterProjectsOwner: (state, action: PayloadAction<string>) => {
            state.filterOwner = action.payload as ProjectState["filterOwner"];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProjects.pending, (state) => {
            state.projects = [];
        });
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
        });
        builder.addCase(fetchProjects.rejected, (state, action) => {
            console.log(action.payload);
        });
    }
});

export const { sortProjects, filterProjectsStatus, filterProjectsOwner } = projectSlice.actions;

export const selectProjects = (state: RootState) => state.project.projects;
export const selectSort = (state: RootState) => state.project.sort;
export const selectFilterStatus = (state: RootState) => state.project.filterStatus;
export const selectFilterOwner = (state: RootState) => state.project.filterOwner;

export default projectSlice.reducer;