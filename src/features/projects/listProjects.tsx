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
    <div className="border px-4 text-neutral-900">
      <h1 className="text-left text-xl font-bold">Projects</h1>
      <table className="w-full table-fixed border bg-white">
        <thead>
          <tr className="w-full  border-b bg-neutral-100 text-neutral-500 ">
            <th className="px-3 py-1 text-left">Name</th>
            <th className="px-3 py-1 text-left">Admin</th>
            <th className="px-3 py-1 text-left">Created</th>
            <th className="px-3 py-1 text-left">Bugs</th>
            <th className="px-3 py-1 text-left">Progress</th>
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
