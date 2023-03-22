import React from 'react';
import ProjectDetails from '../features/projects/projectdetails';
import { useParams } from 'react-router-dom';

export default function ProjectsDetailsPage() {

    const { name } = useParams<{ name: string }>();//this is the name of the project

    return (
        <>
            {
                name && <ProjectDetails name={name} />
            }
        </>
    )
}