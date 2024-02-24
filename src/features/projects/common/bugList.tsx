import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { badgeColor } from "../../common/utils";
import { create } from "../../myTickets/api-bugs";
import { AddBugForm } from "../addBug";
import {Details, DoubleIconsText, Modal } from "../common";
import CommentSection from "../comment/commentSection";
import { getProjectDetails, selectProjectSummary } from "../projectDetailSlice";

interface Props {
  projectName: string;
  handleAddingBug: () => void;
  assigneeOptions: { value: string; label: string }[];
  addingBug: boolean;
  handleOpenEdit: (values: any) => void;
  projectBugs: any[];
  handleEditBug: (values: any) => void;
  handleCloseEdit: () => void;
}

const BugList = ({
  projectName,
  handleAddingBug,
  assigneeOptions,
  addingBug,
  handleOpenEdit,
  projectBugs,
  handleEditBug,
  handleCloseEdit,
}: Props) => {
  const projectSummary = useAppSelector(selectProjectSummary);

  const dispatch = useAppDispatch();

  const addBug = async function (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const name = e.currentTarget.tag.value;
    const description = e.currentTarget.description.value;
    const priority = e.currentTarget.priority.value;
    const assignee = e.currentTarget.assignee.value;
    const projectId = projectSummary?.id as string;
    try {
      let bug = await create({
        name,
        description,
        priority,
        project: projectId,
        assignee,
      });
      if (bug.error) {
        throw new Error(bug.error);
      }
      await dispatch(getProjectDetails(projectName as string));
      // clear all the form fields
      e.currentTarget.tag.value = "";
      e.currentTarget.description.value = "";
      e.currentTarget.priority.value = "";
      e.currentTarget.assignee.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  function formatDate(date: string): string {
    //ex 4 days ago or mins ago or hours ago
    const now = new Date();
    const created = new Date(date);
    const diff = now.getTime() - created.getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    if (years > 0) {
      return `${years} years ago`;
    }
    if (months > 0) {
      return `${months} months ago`;
    }
    if (days > 0) {
      return `${days} days ago`;
    }
    if (hours > 0) {
      return `${hours} hours ago`;
    }
    if (mins > 0) {
      return `${mins} mins ago`;
    }
    return "Just now";
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto rounded-2xl border bg-white p-3">
      <div className="flex mb-8 justify-between">
        <DoubleIconsText
          title="Bug List"
          firstIcon="bug_report"
          titleClass="font-semibold"
          firstIconClass="mr-2"
          secondIconClass="text-[20px] cursor-pointer"
        />
        <button
          className="btn-primary flex items-center"
          onClick={handleAddingBug}
        >
          <span className="material-symbols-outlined leading-0 sm:text-md text-sm">
            add
          </span>
          <span className="text-xs sm:text-sm">Report Bug</span>
        </button>
        {addingBug && (
          <Modal>
            <AddBugForm
              handleCancel={handleAddingBug}
              handleSubmit={addBug}
              select2={assigneeOptions}
            />
          </Modal>
        )}
      </div>
      <ul className="mb-20 flex w-full flex-col font-light">
        {projectBugs.map((bug): JSX.Element => {
          return (
            <li key={bug.id} className="border-b text-left" id={bug.id}>
              <DoubleIconsText
                title={bug.name}
                secondIcon="edit"
                titleClass="font-normal"
                secondIconClass="text-[16px] cursor-pointer"
                ComponentClass="items-center"
                secondHandleIcon={() =>
                  handleOpenEdit({
                    dispatchValues: handleEditBug,
                    handleClose: handleCloseEdit,
                    defVal1: bug.name,
                    defVal2: bug.description,
                    defOption1: { value: bug.status, label: bug.status },
                    defOption2: { value: bug.priority, label: bug.priority },
                    option1: [
                      { value: "Open", label: "Open" },
                      { value: "Closed", label: "Closed" },
                    ],
                    option2: [
                      { value: "Low", label: "Low" },
                      { value: "Medium", label: "Medium" },
                      { value: "High", label: "High" },
                    ],
                    id: bug.id,
                  })
                }
              />
              <p>Assigned to <span className="capitalize font-normal">{bug.assignee.name}</span></p>
              <div className="flex justify-between gap-2">
                <p
                  className={
                    "w-fit rounded-[50px] px-2 " + badgeColor(bug.priority)
                  }
                >
                  {bug.priority}
                </p>
                <div className="text-sm">
                  <span
                    className={`material-symbols-outlined solid leading-0 mr-1 text-xs ${
                      bug.status === "Open"
                        ? "text-secondary-400"
                        : "text-accent-400"
                    }`}
                  >
                    {"circle"}
                  </span>
                  {bug.status}
                </div>
              </div>
              <p>{formatDate(bug.created)}</p>
              <Details key={bug.id} summary="Description & Comments" bugId={bug.id} commentSection={(props:{isOpen:boolean, bugId:string}) => <CommentSection {...props} />} >
                <p className="p-2 text-sm">{bug.description}</p>
              </Details>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BugList;
