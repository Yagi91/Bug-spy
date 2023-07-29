export interface _ProjectBug {
    name: string;
    id: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "Open" | "Closed";
    created: string;
    updated: string;
    type?: "bug" | "feature" | "task";
    assignee?: string;
    project?: {
        name: string;
        _id: string;
    };
}