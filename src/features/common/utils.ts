export const progressBadge = (progress: string) => {
    if (progress === "Completed") {
        return "bg-accent-100 text-accent-800";
    }
    if (progress === "Ongoing") {
        return "bg-yellow-100 text-yellow-800";
    }
    return "bg-gray-100 text-gray-800";
};

export function badgeColor(status: string): string {
    switch (status) {
        case "Low":
            return "bg-accent-100 text-accent-800";
        case "Medium":
            return "bg-yellow-100 text-yellow-800";
        case "High":
            return "bg-secondary-100 text-secondary-800";
        default:
            return "bg-accent-500";
    }
}