import React from "react";
// import { Button } from "./common";

export interface Props {
  name: string;
  bugs: number;
  Created: string;
  admin: string;
  progress: "Completed" | "Ongoing";
  handleClick: (
    event: React.MouseEvent<HTMLTableRowElement>,
    name: string
  ) => void;
  handleEdit?: (event: React.MouseEvent<HTMLDivElement>) => void; //has to stop propagation to prevent the parent li from being clicked
}

export default function ProjectsCard({
  name,
  Created,
  bugs,
  admin,
  progress,
  handleClick,
  handleEdit,
}: Props): JSX.Element {
  return (
    <tr className="project-card border-b" onClick={(e) => handleClick(e, name)}>
      <td className="px-3 py-2 text-left">{name}</td>
      <td className="px-3 py-2 text-left">{admin}</td>
      <td className="px-3 py-2 text-left">{Created}</td>
      <td className="px-3 py-2 text-left">{bugs}</td>
      <td className="px-3 py-2 text-left text-xs sm:text-base">{progress}</td>
      <td
        onClick={(e) => {
          if (typeof handleEdit === "function") return handleEdit(e);
        }}
        className="hidden justify-end px-1 py-2 lg:flex"
      >
        <button className="btn-primary flex h-10 w-[87px] items-center justify-around p-2">
          <span className="material-symbols-outlined line block -translate-y-0.5 ">
            edit_square
          </span>
          <span>Edit</span>
        </button>
      </td>
    </tr>
  );
}
