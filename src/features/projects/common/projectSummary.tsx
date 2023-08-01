import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DoubleIconsText, Modal } from "../common";
import EditForm from "../edit";
import { Props as EditFormProps } from "../edit";
import {
  selectProjectSummary,
  updateProjectDetails,
} from "../projectDetailSlice";
import React from "react";

interface Props {
  handleOpenEdit: (formField: EditFormProps) => void;
  handleCloseEdit: () => void;
  showEdit: boolean;
  editFormFields: EditFormProps | null;
}

const ProjectSummary = ({
  handleOpenEdit,
  handleCloseEdit,
  showEdit,
  editFormFields,
}: Props) => {
  const projectSummary = useAppSelector(selectProjectSummary);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBack = function (): void {
    navigate(-1);
  };

  const handleEditProject = async function (props: {
    title: string;
    description: string;
    progress: string;
  }): Promise<void> {
    const { title, description, progress } = props;
    console.log(" handleEditProject ", title, description, progress);
    await dispatch(
      updateProjectDetails({
        name: title,
        description,
        progress,
        id: projectSummary?.id as string,
      })
    );
    navigate(`/projects/${title}`, { replace: true });
    handleCloseEdit();
  };
  return (
    <div className="rounded-[12px] border bg-white px-3 py-1">
      <DoubleIconsText
        title={projectSummary?.name || ""}
        firstIcon="arrow_back_ios_new"
        secondIcon="edit"
        titleClass="font-extrabold text-lg"
        firstIconClass="mr-2 cursor-pointer"
        secondIconClass="text-[20px] cursor-pointer"
        ComponentClass="items-center py-1 border-b"
        firstHandleIcon={handleBack}
        secondHandleIcon={() =>
          handleOpenEdit({
            dispatchValues: handleEditProject,
            handleClose: handleCloseEdit,
            defVal1: projectSummary?.name,
            defVal2: projectSummary?.description,
            defOption1: {
              value: projectSummary?.progress || "",
              label: projectSummary?.progress || "",
            },
            option1: [
              { value: "Ongoing", label: "Ongoing" },
              { value: "Completed", label: "Completed" },
            ],
          })
        }
      />
      {showEdit && (
        <Modal>
          <EditForm {...editFormFields} />
        </Modal>
      )}
      <p className="text-left text-xs">{projectSummary?.description}</p>
      <p className="text-left text-xs capitalize">
        Admin: {projectSummary?.admin}
      </p>
      <p className="text-left text-xs">{projectSummary?.progress}</p>
      <p className="text-left text-[8px] italic opacity-60">
        Created: {projectSummary?.created}
      </p>
      <p className="text-left text-[8px] italic opacity-60">
        Updated: {projectSummary?.updated}
      </p>
    </div>
  );
};

export default ProjectSummary;
