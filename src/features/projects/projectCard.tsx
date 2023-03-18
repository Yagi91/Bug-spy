import React from 'react';

interface Props {
    name: string;
    date: string;
    admin: string;
    progress: "Completed" | "Ongoing";
    handleClick?: (name: string, event?: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ProjectsCard({ name, date, admin, progress, handleClick }: Props) {
    return (
        <div className="project-card">
            <p className="project-card-name">Name:{name}</p>
            <p>Admin: {admin}</p>
            <div>{date}</div>
            <p>Progress: {progress}</p>
        </div>
    )
}