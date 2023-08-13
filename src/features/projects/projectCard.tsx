import React from "react";
import { progressBadge } from "../common/utils";

export interface Props {
  name: string;
  totalBugs: number;
  created: string;
  admin: {
    name: string;
    _id: string;
  };
  progress: "Completed" | "Ongoing";
  handleClick: (
    event: React.MouseEvent<HTMLTableRowElement>,
    name: string,
    _id: string
  ) => void;
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>, props: any) => void; //has to stop propagation to prevent the parent li from being clicked
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
  const formatName = (name: string, clip: boolean) => {
    if (name.length > 30 && clip) {
      return name.slice(0, 20) + "...";
    }
    let newName = name[0].toUpperCase() + name.slice(1);
    return newName;
  };

  return (
    <tr
      className="project-card cursor-pointer border-b hover:bg-neutral-100"
      onClick={(e) => handleClick(e, name, _id)}
    >
      <td className="px-3 py-2 text-left">{formatName(name, true)}</td>
      <td className="px-3 py-2 text-left">{formatName(admin.name, false)}</td>
      <td className="px-3 py-2 text-left">{created}</td>
      <td className="px-3 py-2 text-left">{totalBugs}</td>
      <td className={"px-3 py-2 text-left text-xs sm:text-base "}>
        <span className={"rounded-[12px] px-3 py-1 " + progressBadge(progress)}>
          {progress}
        </span>
      </td>
      <td className="hidden justify-end px-1 py-2 lg:flex">
        <button
          type="button"
          className="btn-primary flex h-10 w-[87px] items-center justify-around p-2"
          onClick={(e) => handleEdit(e, { name, progress, _id })}
        >
          <span className="material-symbols-outlined line block -translate-y-0.5 ">
            edit_square
          </span>
          <span>Edit</span>
        </button>
      </td>
    </tr>
  );
}
