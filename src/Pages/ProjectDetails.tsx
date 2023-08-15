import React from "react";
import ProjectDetails from "../features/projects/projectdetails";
import { useParams } from "react-router-dom";
import { useTitle } from "../features/common/customHooks";

export default function ProjectsDetailsPage() {
  const { name: projectName } = useParams<{ name: string }>(); //this is the name of the project

  useTitle("Bug Spy - Project Details: " + projectName);

  return <>{projectName && <ProjectDetails projectName={projectName} />}</>;
}
