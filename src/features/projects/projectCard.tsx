import React from 'react';

export interface Props {
    name: string;
    bugs: number;
    Created: string;
    admin: string;
    progress: "Completed" | "Ongoing";
    handleClick: (event: React.MouseEvent<HTMLLIElement>, name: string) => void;
    handleEdit?: (event: React.MouseEvent<HTMLDivElement>) => void;//has to stop propagation to prevent the parent li from being clicked

}

export default function ProjectsCard({ name, Created, bugs, admin, progress, handleClick, handleEdit }: Props): JSX.Element {
    return (
        <li className="project-card" onClick={(e) => handleClick(e, name)}>
            <p className="project-card-name">Name:{name}</p>
            <p>Bugs: {bugs}</p>
            <p>Admin: {admin}</p>
            <div>{Created}</div>
            <p>Progress: {progress}</p>
            <div onClick={(e) => { if (typeof handleEdit === 'function') return handleEdit(e) }} >Edit</div>
        </li>
    )
}