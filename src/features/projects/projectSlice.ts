import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ListProjectsProps } from "./listProjects";

export interface ProjectState {
    projects: ListProjectsProps[];
    sort: "Name" | "Most bugs" | "Newest" | "Admin";
    filter: "All" | "Completed" | "Ongoing";
    filterOwner: "All" | "My projects";
}

const initialState: ProjectState = {
    projects: [
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
    ],
    sort: "Name",
    filter: "All",
    filterOwner: "All",
}


export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        sortProjects: (state, action: PayloadAction<string>) => {
            state.sort = action.payload as ProjectState["sort"];
        },
    },
})