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

export function formatDate(date: string): string {
    //ex 4 days ago or mins ago or hours ago
    const now = new Date();
    const created = new Date(date);
    const diff = now.getTime() - created.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    if (days > 0) {
        return `${days} days ago`;
    }
    if (hours > 0) {
        return `${hours} hours ago`;
    }
    if (mins > 0) {
        return `${mins} mins ago`;
    }
    return "Just now";
}

export function formatDateShorthand(date: Date) {
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth() + 1;
    let year: string | number = date.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    year = year.toString().substr(-2); // 2021 => 21

    return `${day}/${month}/${year}`;
}

export function formatDateLong(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate.replace(/\b(\d{1,2})(th|nd|rd|st)\b/g, '$1$2');
  }