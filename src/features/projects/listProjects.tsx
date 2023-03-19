import React from 'react';
import ProjectsCard, { Props as cardsProps } from './projectCard';

interface Props {
    projects: cardsProps[]//{ name: string, description: string, id: string }[]
}

export default function ListProjects({ projects }: Props) {
    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (<ProjectsCard key={project.name} {...project} />))}
                {/*display the project in a list format, ...project is the same as name={\project.name} date={project.date} admin={project.admin} progress={project.progress} handleClick={project.handleClick} handleEdit={project.handleEdit}*/}
            </ul>
        </div>
    )
}