import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectProjectSummary,
  selectProjectMembers,
  selectProjectBugs,
  selectLoading,
  selectError,
  getProjectDetails,
  deleteProjectDetails,
  updateProjectDetails,
  deleteProjectMember,
} from "./projectDetailSlice";
import { setConfirmModal } from "../common/confirmSlice";
import { IconButton, Details, CommentSection, Modal } from "./common";
import { AddBugForm } from "./addBug";
import AddMembers from "./addMembers";
import { DoubleIconsText } from "./common";
import { Props as EditFormProps } from "./edit";
import EditForm from "./edit";
import { getUsers, selectUsers } from "../profile/userSlice";
import { create, update } from "../myTickets/api-bugs";

interface Props {
  projectName: string;
}

export default function ProjectDetails({ projectName }: Props) {
  const [showMembers, setShowMembers] = React.useState<boolean>(false);
  const [addingBug, setAddingBug] = React.useState<boolean>(false);
  const [addingMembers, setAddingMembers] = React.useState<boolean>(false);
  const [showEdit, setShowEdit] = React.useState<boolean>(false);
  const [editFormFields, setEditFormFields] =
    React.useState<EditFormProps | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectSummary = useAppSelector(selectProjectSummary);
  const projectMembers = useAppSelector(selectProjectMembers);
  const projectBugs = useAppSelector(selectProjectBugs);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(getProjectDetails(projectName as string));
  }, [dispatch, projectName]);

  useEffect(() => {
    if (users.length > 0) return;
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getUsers(signal));
    // return () => {
    //   controller.abort();
    // };
  }, [dispatch, users.length]);

  const deleteProject = async function (): Promise<void> {
    console.log("Deleting Project");
    dispatch(deleteProjectDetails(projectSummary?.id as string));
    navigate(-1);
    console.log("Project Deleted");
    return;
  };

  const handleBack = function (): void {
    navigate(-1);
  };

  const deleteMember = async function (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    e.preventDefault();
    const id = e.currentTarget.value;
    console.log(id);
    const filterProjectMembersId = (projectMembers: any) => {
      const membersID: string[] = [];
      for (let i = 0; i < projectMembers.length; i++) {
        if (projectMembers[i].id !== id) {
          membersID.push(projectMembers[i].id);
        }
      }
      return membersID;
    };
    const updatedMembersId = filterProjectMembersId(projectMembers);
    dispatch(
      deleteProjectMember({
        id: projectSummary?.id as string,
        members: updatedMembersId,
      })
    );
    //update the project members
    dispatch(getProjectDetails(projectName as string));
    console.log("%d Member Deleted", id);
    return;
  };

  const handleAddingBug = function (): void {
    setAddingBug(!addingBug);
  };

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
    } catch (error) {
      console.error(error);
    }

    console.log({ name, description, priority, assignee });
  };

  const handleAddingMembers = function (): void {
    setAddingMembers(!addingMembers);
  };
  const handleAddMembers = async (
    e: React.FormEvent<HTMLButtonElement>,
    members: { value: string; label: string }[]
  ): Promise<void> => {
    if (members.length < 1) {
      handleAddingMembers();
      return;
    }
    console.log(members);
    // await dispatch(setProjectMembers([...projectMembers]));
    const newMembersId = members.map((member) => member.value);
    const membersId = projectMembers.map((member) => member.id);
    const updatedMembersId = [...membersId, ...newMembersId];
    await dispatch(
      updateProjectDetails({
        id: projectSummary?.id,
        members: updatedMembersId,
      })
    );
    await dispatch(getProjectDetails(projectName as string));
    handleAddingMembers();
  };

  const handleOpenEdit = function (formField: EditFormProps): void {
    setEditFormFields(formField);
    setShowEdit(true);
  };
  const handleCloseEdit = function (): void {
    setShowEdit(false);
    setEditFormFields(null);
  };

  const handleEditBug = async function (props: {
    title: string;
    description: string;
    priority: string;
    progress: string;
    id: string;
  }): Promise<void> {
    console.log(props);
    const jwt = sessionStorage.getItem("jwt");
    const bugChanges = {
      name: props.title,
      description: props.description,
      status: props.progress,
      priority: props.priority,
    };
    const bugId = props.id;
    try {
      let data = await update(bugId, { t: jwt }, bugChanges);
      console.log(data);
      await dispatch(getProjectDetails(projectName as string));
    } catch (error) {
      console.log(error);
    }
    handleCloseEdit();
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

  const possibleMembers = React.useMemo(() => {
    return users.filter((user) => {
      for (let i = 0; i < projectMembers.length; i++) {
        if (
          user._id === projectMembers[i].id &&
          user.name !== projectSummary?.admin
        ) {
          return false;
        }
      }
      return true;
    });
  }, [users, projectMembers, projectSummary?.admin]);

  const membersOptions = React.useMemo(() => {
    return possibleMembers.map((member) => {
      return { value: member._id, label: member.name };
    });
  }, [possibleMembers]);

  const assigneeOptions = React.useMemo(() => {
    return projectMembers.map((member) => {
      return { value: member.id, label: member.name };
    });
  }, [projectMembers]);

  return (
    <div className="flex h-full w-full flex-col border">
      <header className="mb-1 h-[180px]">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          projectSummary && (
            <div className="rounded-[12px] border bg-white px-3 py-1">
              <DoubleIconsText
                title={projectSummary.name}
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
                    defVal1: projectSummary.name,
                    defVal2: projectSummary.description,
                    defOption1: {
                      value: projectSummary.progress,
                      label: projectSummary.progress,
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
              <p className="text-left text-xs">{projectSummary.description}</p>
              <p className="text-left text-xs capitalize">
                Admin: {projectSummary.admin}
              </p>
              <p className="text-left text-xs">{projectSummary.progress}</p>
              <p className="text-left text-[8px] italic opacity-60">
                Created: {projectSummary.created}
              </p>
              <p className="text-left text-[8px] italic opacity-60">
                Updated: {projectSummary.updated}
              </p>
            </div>
          )
        )}
        <div className="mt-2 flex w-full items-center justify-around gap-2 px-3 sm:justify-start">
          <IconButton
            icon="person_add"
            text="Add Member"
            handleClick={handleAddingMembers}
          />
          {addingMembers && (
            <Modal>
              {" "}
              <AddMembers
                handleSubmit={handleAddMembers}
                options={membersOptions}
              />{" "}
            </Modal>
          )}
          <div className="relative">
            <IconButton
              icon="groups"
              text="Members"
              handleClick={() => setShowMembers(!showMembers)}
            />
            <ul
              className={`dropdown min-h-12 invisible absolute right-1/2 -z-50 min-w-full -translate-y-10 translate-x-1/2 rounded-xl border bg-white px-2 py-3 text-xs text-neutral-900 shadow-md transition-all sm:text-sm ${
                showMembers && "show"
              }`}
            >
              {projectMembers.length ? (
                projectMembers.map((member: any): JSX.Element => {
                  return (
                    <li key={member.id} className="border-b-2 py-1 text-left">
                      <h4 className="font-bold">{member.name}</h4>
                      <p>{member.role}</p>
                      <span className="flex justify-between gap-5">
                        <p>{member.email}</p>
                        <button
                          value={member.id}
                          onClick={deleteMember}
                          className="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-500"
                        >
                          <span className="material-symbols-outlined leading-0 remove text-xs text-secondary-700 sm:text-sm">
                            person_remove
                          </span>
                        </button>
                      </span>
                    </li>
                  );
                })
              ) : (
                <li className="border-b-2 py-1 text-left">
                  <strong>No Members</strong>
                </li>
              )}
            </ul>
          </div>
          <IconButton
            icon="delete"
            text="Delete Project"
            handleClick={() =>
              dispatch(
                setConfirmModal({
                  display: true,
                  onConfirm: deleteProject,
                })
              )
            }
          />
        </div>
      </header>
      <div className="height grow rounded-2xl border bg-white p-3">
        <div className="flex justify-between">
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
        <ul className="flex w-full flex-col font-light">
          {projectBugs.map((bug): JSX.Element => {
            return (
              <li key={bug.id} className="border-b text-left">
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
                <div className="flex justify-between gap-2">
                  <p>{bug.priority}</p>
                  <div className="text-sm">
                    <span
                      className={`material-symbols-outlined leading-0 mr-1 text-xs ${
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
                <p>Created: {bug.created}</p>
                <Details summary="View Description & Comment">
                  <p className="p-2 text-sm">{bug.description}</p>
                  <CommentSection />
                </Details>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
