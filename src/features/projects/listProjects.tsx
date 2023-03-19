import React from 'react';
import ProjectsCard, { Props as cardsProps } from './projectCard';

interface Props {
    projects: cardsProps[]
}

export default function ListProjects({ projects }: Props) {
    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (<ProjectsCard key={project.name} {...project} />))}
            </ul>
        </div>
    )
}