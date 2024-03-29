import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { _ProjectBug } from "../common/types";
import { getProject, deleteProject, updateProject } from "./api-projects";


interface _ProjectSummary {
    name: string;
    description: string;
    admin: { _id: string; name: string };
    progress: string;
    created: string;
    updated: string;
    id: string;
}

interface _ProjectMembers {
    name: string;
    email: string;
    role: string;
    id: string;
}


export interface ProjectDetailsState {
    projectSummary: _ProjectSummary | null;
    projectMembers: _ProjectMembers[];
    projectBugs: _ProjectBug[];
    loading: boolean;
    error?: string | null;
}

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
            return project;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const updateProjectDetails = createAsyncThunk(
    "projectDetails/updateProjectDetails",
    async (project: any, thunkAPI) => {
        try {
            const updatedProject = await updateProject({ projectId: project.id as string, project: project });
            return updatedProject;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteProjectMember = createAsyncThunk(
    "projectDetails/deleteProjectMember",
    async (project: any, thunkAPI) => {
        try {
            const updatedProject = await updateProject({ projectId: project.id as string, project: project });
            return updatedProject;
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
        deleteProjectDetails: (state, action: PayloadAction<string>) => {
            deleteProject({ projectId: action.payload });
            state.projectSummary = null;
            state.projectMembers = [];
            state.projectBugs = [];
            state.loading = true;
            state.error = null;
        },
        clearProjectDetails: (state) => {
            state.projectSummary = null;
            state.projectMembers = [];
            state.projectBugs = [];
            state.loading = true;
            state.error = null;

        }
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
                id: action.payload._id,
            };
            const bugs: _ProjectBug[] = action.payload.bugs.map((bug: any) => {
                return {
                    name: bug.name,
                    description: bug.description,
                    priority: bug.priority,
                    status: bug.status,
                    created: bug.created,
                    updated: bug.updated,
                    id: bug._id,
                    assignee: bug.assignee,
                };
            });
            const members: _ProjectMembers[] = action.payload.members.map((member: any) => {
                return {
                    name: member.name,
                    email: member.email,
                    id: member._id,
                    role: member.role,
                };
            });
            state.projectSummary = project;
            state.projectMembers = members;
            state.projectBugs = bugs;
            state.loading = false;
        });
        builder.addCase(getProjectDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(updateProjectDetails.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(updateProjectDetails.fulfilled, (state, action) => {
            const { name, description, progress, updated } = action.payload;
            if (state.projectSummary) {
                state.projectSummary.name = name;
                state.projectSummary.description = description;
                state.projectSummary.progress = progress;
                state.projectSummary.updated = updated;
            }
            state.loading = false;
        }
        );
        builder.addCase(updateProjectDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );

        builder.addCase(deleteProjectMember.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(deleteProjectMember.fulfilled, (state, action) => {
            state.loading = false;
        }
        );
        builder.addCase(deleteProjectMember.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );
    },
});

export const { setProjectDetails, setProjectMembers, setProjectBugs, setLoading, deleteProjectDetails, clearProjectDetails } = projectDetailsSlice.actions;

export const selectProjectSummary = (state: RootState) => state.projectDetails.projectSummary;
export const selectProjectMembers = (state: RootState) => state.projectDetails.projectMembers;
export const selectProjectBugs = (state: RootState) => state.projectDetails.projectBugs;
export const selectLoading = (state: RootState) => state.projectDetails.loading;
export const selectError = (state: RootState) => state.projectDetails.error;

export default projectDetailsSlice.reducer;
