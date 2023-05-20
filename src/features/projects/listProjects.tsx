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
        <thead>
          <tr className="w-full  border-b bg-neutral-100 text-neutral-500">
            <th className="p-1">Name</th>
            <th className="p-1">Admin</th>
            <th className="p-1">Created</th>
            <th className="p-1">Bugs</th>
            <th className="p-1">Progress</th>
            {/* The empty th makes the bg color span the full width */}
            <th>{""}</th>
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
