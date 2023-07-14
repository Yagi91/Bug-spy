import React from "react";
// import { Button } from "./common";

export interface Props {
  name: string;
  totalBugs: number;
  created: string;
  admin: string;
  progress: "Completed" | "Ongoing";
  handleClick: (
    event: React.MouseEvent<HTMLTableRowElement>,
    name: string,
    _id: string
  ) => void;
  handleEdit?: (event: React.MouseEvent<HTMLDivElement>) => void; //has to stop propagation to prevent the parent li from being clicked
  _id: string;
}

export default function ProjectsCard({
  name,
  created,
  totalBugs,
  admin,
  progress,
  handleClick,
  handleEdit,
  _id,
}: Props): JSX.Element {
  return (
    <tr
      className="project-card cursor-pointer border-b"
      onClick={(e) => handleClick(e, name, _id)}
    >
      <td className="px-3 py-2 text-left">{name}</td>
      <td className="px-3 py-2 text-left">{admin}</td>
      <td className="px-3 py-2 text-left">{created}</td>
      <td className="px-3 py-2 text-left">{totalBugs}</td>
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
