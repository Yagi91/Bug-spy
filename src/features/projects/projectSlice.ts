import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ListProjectsProps } from "./listProjects";
import { getProjects, createProject } from "./api-projects";

export interface ProjectState {
    projects: ListProjectsProps[];
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
        try {
            const _projects = await getProjects();
            return _projects;
        }
        catch (error: any) {
            if (error.response && error.response.data.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
interface AddNewProjectProps {
    name: string;
    description: string;
    admin: string;
    selectedMembers?: string[];
}

export const addNewProject = createAsyncThunk(
    "project/addNewProject",
    async ({ name, description, selectedMembers, admin }: AddNewProjectProps, thunkAPI) => {
        try {
            const newProject = await createProject({ name, description, members: selectedMembers, admin });
            return newProject;
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
        });
        builder.addCase(addNewProject.pending, (state) => {
        });
        builder.addCase(addNewProject.fulfilled, (state, action) => {
        });
        builder.addCase(addNewProject.rejected, (state, action) => {
        });
    }
});


export const { sortProjects, filterProjectsStatus, filterProjectsOwner } = projectSlice.actions;

export const selectProjects = (state: RootState) => state.project.projects;
export const selectSort = (state: RootState) => state.project.sort;
export const selectFilterStatus = (state: RootState) => state.project.filterStatus;
export const selectFilterOwner = (state: RootState) => state.project.filterOwner;

export default projectSlice.reducer;