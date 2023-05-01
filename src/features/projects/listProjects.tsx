import React from "react";
import ProjectsCard, { Props as cardsProps } from "./projectCard";
import { useNavigate } from "react-router-dom";
import { SearchBar, FloatingButton } from "./common";
export type ListProjectsProps = Omit<cardsProps, "handleClick">; // { name: string, description: string, id: string } handleClick is not needed here

interface Props {
  projects: Omit<cardsProps, "handleClick">[]; //{ name: string, description: string, id: string }[]
  floatingButton?: JSX.Element;
}

export default function ListProjects({ projects, floatingButton }: Props) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, name: string) => {
    e.preventDefault();
    navigate(`/projects/${name}`);
  };

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <ProjectsCard
            key={project.name}
            {...project}
            handleClick={(e) => {
              handleClick(e, project.name);
            }}
          />
        ))}
      </ul>
      {floatingButton}
    </div>
  );
}
