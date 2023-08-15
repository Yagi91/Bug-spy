import React from "react";
import Projects from "../features/projects/projects";
import { useTitle } from "../features/common/customHooks";

export default function ProjectsPage() {
  useTitle("Bug Spy - Projects");

  return (
    <>
      <Projects />
    </>
  );
}
