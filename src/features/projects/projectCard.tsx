import React from 'react';

export interface Props {
    name: string;
    date: string;
    admin: string;
    progress: "Completed" | "Ongoing";
    handleClick: (event: React.MouseEvent<HTMLDivElement>, name: string) => void;
    handleEdit?: (event: React.MouseEvent<HTMLDivElement>) => void;

}

export default function ProjectsCard({ name, date, admin, progress, handleClick, handleEdit }: Props): JSX.Element {
    return (
        <div className="project-card" onClick={(e) => handleClick(e, name)}>
            <p className="project-card-name">Name:{name}</p>
            <p>Admin: {admin}</p>
            <div>{date}</div>
            <p>Progress: {progress}</p>
            <div onClick={(e) => { if (typeof handleEdit === 'function') return handleEdit(e) }} >Edit</div>
        </div>
    )
}