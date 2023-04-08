export interface _ProjectBug {
    name: string;
    id: string;
    description: string;
    priority: string;
    status: string;
    created: string;
    updated: string;
    type?: "bug" | "feature" | "task";
    assignee?: string[];
}