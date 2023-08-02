import React from "react";
import ProjectsCard, { Props as cardsProps } from "./projectCard";
import { useNavigate } from "react-router-dom";
import { formatDateShorthand } from "../common/utils";
import { Modal } from "./common";
import QuickEdit from "./common/quickEdit";
import { useAppDispatch } from "../../app/hooks";
import {
  deleteProjectDetails,
  updateProjectDetails,
} from "./projectDetailSlice";
import { fetchProjects } from "./projectSlice";
export type ListProjectsProps = Omit<cardsProps, "handleClick">; // { name: string, description: string, id: string } handleClick is not needed here

interface Props {
  projects: Omit<cardsProps, "handleClick">[]; //{ name: string, description: string, id: string }[]
  floatingButton?: JSX.Element;
}

export default function ListProjects({ projects, floatingButton }: Props) {
  const [showQuickEdit, setShowQuickEdit] = React.useState<boolean>(false);
  const [quickEditFields, setQuickEditFields] = React.useState<{
    name: string;
    progress: string;
    _id: string;
  } | null>({ name: "", progress: "", _id: "" });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    name: string
  ) => {
    e.preventDefault();
    navigate(`/projects/${name}`);
  };
  const handleShowQuickEdit = () => {
    setShowQuickEdit(!showQuickEdit);
  };
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, props: any) => {
    e.stopPropagation();
    handleShowQuickEdit();
    setQuickEditFields(props);
  };
  const handleSubmitEdit = async (props: any) => {
    let updatedProj = { ...props, id: quickEditFields?._id };
    await dispatch(updateProjectDetails(updatedProj));
    await dispatch(fetchProjects());
    setQuickEditFields(null);
    handleShowQuickEdit();
  };
  const handleCancelEdit = (e: React.FormEvent<HTMLFormElement>) => {
    handleShowQuickEdit();
  };
  const handleDeleteEdit = async () => {
    await dispatch(deleteProjectDetails(quickEditFields?._id as string));
    await dispatch(fetchProjects());
    setQuickEditFields(null);
    handleShowQuickEdit();
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
                  handleEdit={handleEdit}
                />
              </>
            );
          })}
        </tbody>
      </table>
      {floatingButton}
      {showQuickEdit && (
        <Modal>
          <QuickEdit
            handleSubmit={handleSubmitEdit}
            handleCancel={handleCancelEdit}
            handleDelete={handleDeleteEdit}
            name={quickEditFields?.name as string}
            status={quickEditFields?.progress as "Ongoing" | "Completed"}
            selectOptions={[
              { value: "Ongoing", label: "Ongoing" },
              { value: "Completed", label: "Completed" },
            ]}
          />
        </Modal>
      )}
    </div>
  );
}
