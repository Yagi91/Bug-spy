import React from "react";
import ProjectsCard, { Props as cardsProps } from "./projectCard";
import { useNavigate } from "react-router-dom";
import { formatDateShorthand } from "../common/utils";
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
    <div className="mt-4 overflow-x-scroll rounded-lg border bg-white text-neutral-900 sm:overflow-hidden">
      <table className="w-full table-auto lg:table-fixed">
        <caption className="px-3 text-left text-lg font-bold">Projects</caption>
        <thead>
          <tr className="w-full  border-b bg-neutral-100 text-neutral-500 ">
            <th className="px-3 py-1 text-left">Name</th>
            <th className="px-3 py-1 text-left">Admin</th>
            <th className="px-3 py-1 text-left">Created</th>
            <th className="px-3 py-1 text-left">Bugs</th>
            <th className="px-3 py-1 text-left">Progress</th>
            {/* The empty th makes the bg color span the full width */}
            <th className="hidden lg:table-cell">{""}</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            let projectDate = formatDateShorthand(new Date(project.created));
            return (
              <>
                <ProjectsCard
                  key={project._id}
                  {...project}
                  created={projectDate}
                  handleClick={(e) => {
                    handleClick(e, project.name);
                  }}
                />
              </>
            );
          })}
        </tbody>
      </table>
      {floatingButton}
    </div>
  );
}
