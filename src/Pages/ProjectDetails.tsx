import React from "react";
import ProjectDetails from "../features/projects/projectdetails";
import { useParams } from "react-router-dom";

export default function ProjectsDetailsPage() {
  const { name: projectName } = useParams<{ name: string }>(); //this is the name of the project

  return <>{projectName && <ProjectDetails projectName={projectName} />}</>;
}
