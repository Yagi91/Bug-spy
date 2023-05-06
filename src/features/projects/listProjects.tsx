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

  const handleClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    name: string
  ) => {
    e.preventDefault();
    navigate(`/projects/${name}`);
  };

  return (
    <div className="border bg-red-400 text-neutral-900">
      <h1 className="text-left text-xl font-bold">Projects</h1>
      <table className="w-full table-auto border bg-white">
        <thead className=" ">
          <tr>
            <th>Name</th>
            <th>Admin</th>
            <th>Created</th>
            <th>Bugs</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <ProjectsCard
              key={project.name}
              {...project}
              handleClick={(e) => {
                handleClick(e, project.name);
              }}
            />
          ))}
        </tbody>
      </table>
      {floatingButton}
    </div>
  );
}
